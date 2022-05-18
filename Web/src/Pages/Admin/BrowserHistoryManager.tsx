import {
  Button,
  Form,
  Input,
  message,
  Table,
  TablePaginationConfig,
  DatePicker,
} from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import moment, { Moment } from "moment";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  IHistoryInfo,
  SearchParams,
  syncManagerService,
} from "src/services/syncManagerService";
import styled from "styled-components";
import locale from "antd/es/date-picker/locale/zh_CN";
import { template } from "lodash";

const StyledP = styled.p`
  margin: 0;
  padding: 0;
  max-width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }
`;
export default function BrowserHistoryManager() {
  const [tableData, setTableData] = useState([] as Array<IHistoryInfo>);
  const [loading, setLoading] = useState(false);
  const [searchFilterParam, setSearchFilterParam] = useState({
    keyword: "",
    datetimeFrom: moment()
      .subtract(7, "days")
      .hours(0)
      .minute(0)
      .second(0)
      .millisecond(0),
    datetimeTo: moment().hours(23).minute(59).second(59).millisecond(0),
  } as SearchParams);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    size: "default",
    showTotal: (total) => {
      return template("共 ${total} 条记录")({ total });
    },
  } as TablePaginationConfig);
  const [form] = Form.useForm();
  useEffect(() => {
    loadData({
      ...searchFilterParam,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
    });
  }, []);
  function loadData(searchParams: SearchParams) {
    setLoading(true);
    syncManagerService
      .queryHistoryList(searchParams)
      .then((res) => {
        setPagination({
          ...pagination,
          total: res.data.total,
          pageSize: res.data.pageSize,
          current: res.data.current,
        });
        setTableData(res.data?.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        message.error(e.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const onTableChange = useCallback(
    (
      p: TablePaginationConfig,
      f: Record<string, FilterValue | null>,
      s: SorterResult<IHistoryInfo> | SorterResult<IHistoryInfo>[]
    ) => {
      setLoading(true);
      setPagination({
        ...pagination,
        pageSize: p.pageSize,
        current: p.current,
        total: p.total,
      });
      setTableData([]);
      loadData({
        ...searchFilterParam,
        pageIndex: p.current,
        pageSize: p.pageSize,
      });
    },
    [setPagination, setLoading, searchFilterParam]
  );
  const onSearchFilterParamSearchValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchFilterParam({
        ...searchFilterParam,
        keyword: e.target.value,
      });
    },
    [searchFilterParam]
  );
  const onSearchFilterParamDatetimeValueChange = useCallback(
    (values: [Moment, Moment]) => {
      setSearchFilterParam({
        ...searchFilterParam,
        datetimeFrom: values[0]?.hour(0).minute(0).second(0),
        datetimeTo: values[1].hour(23).minute(59).second(59),
      });
    },
    [searchFilterParam]
  );
  const onSearch = useCallback(() => {
    loadData({
      ...searchFilterParam,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
    });
  }, [searchFilterParam, pagination]);
  const onDelete = useCallback(() => {
    setLoading(true);
    syncManagerService
      .batchDeleteHistoryItem(selectedRowKeys)
      .then((res) => {
        message.success("删除成功");
        setSelectedRowKeys([]);
        loadData({
          ...searchFilterParam,
          pageSize: pagination.pageSize,
          pageIndex: pagination.current,
        });
      })
      .catch((e) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedRowKeys, searchFilterParam, pagination]);
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (value: string, history: IHistoryInfo) => (
        <StyledP title={value}>
          <img src={history.faviconUrl} alt="" />
          <a target="_blank" href={history.url}>
            {value}
          </a>
        </StyledP>
      ),
    },
    {
      title: "Url",
      dataIndex: "url",
      render: (value: string) => <StyledP title={value}>{value}</StyledP>,
    },
    {
      title: "设备名称",
      dataIndex: "equipmentName",
      render: (value: string) => <span>{value}</span>,
    },
    {
      title: "访问时间",
      dataIndex: "timestamp",
      render: (value: string) => moment(value).format("YYYY/MM/DD HH:mm:ss"),
    },
  ];
  return (
    <section>
      <div
        css={`
          padding: 0 0 8px 0;
          display: flex;
          justify-content: space-between;
        `}
      >
        <Form layout="inline" form={form}>
          <Form.Item label="关键字">
            <Input
              allowClear
              placeholder="请输入关键字"
              width={200}
              value={searchFilterParam.keyword}
              onChange={onSearchFilterParamSearchValueChange}
              onPressEnter={onSearch}
            />
          </Form.Item>
          <Form.Item label="时间范围">
            <DatePicker.RangePicker
              locale={locale}
              value={[
                searchFilterParam.datetimeFrom,
                searchFilterParam.datetimeTo,
              ]}
              onChange={onSearchFilterParamDatetimeValueChange}
              disabledDate={(current: any) => {
                return current && current > moment().endOf("day");
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSearch} loading={loading}>
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Button
          danger
          onClick={onDelete}
          loading={loading}
          disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}
        >
          {!(selectedRowKeys && selectedRowKeys.length > 0)
            ? "删除"
            : `删除${selectedRowKeys.length} 条记录`}
        </Button>
      </div>
      <Table
        size="small"
        columns={columns}
        rowKey={(history: IHistoryInfo) => history.id}
        rowSelection={rowSelection}
        dataSource={tableData}
        pagination={pagination}
        loading={loading}
        onChange={onTableChange}
      />
    </section>
  );
}
