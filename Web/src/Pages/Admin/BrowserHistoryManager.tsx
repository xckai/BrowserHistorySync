import { Button, message, Table, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  IHistoryInfo,
  SearchParams,
  syncManagerService,
} from "src/services/syncManagerService";
import styled from "styled-components";
const StyledP = styled.p`
  margin: 0;
  padding: 0;
  max-width: 40rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export default function BrowserHistoryManager() {
  const [tableData, setTableData] = useState([] as Array<IHistoryInfo>);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    size: "default",
  } as TablePaginationConfig);
  function loadData(
    keyword?: string,
    searchParam?: SearchParams,
    pageIndex = 1,
    pageSize = 15
  ) {
    setLoading(true);
    syncManagerService
      .queryHistoryList(keyword, searchParam, pageIndex, pageSize)
      .then((res) => {
        setPagination({
          total: res.data.total,
          pageSize: res.data.pageSize,
          current: res.data.current,
          size: "default",
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
  useEffect(() => {
    loadData("", {}, 1, 15);
  }, []);
  const onChange = useCallback(
    (
      p: TablePaginationConfig,
      f: Record<string, FilterValue | null>,
      s: SorterResult<IHistoryInfo> | SorterResult<IHistoryInfo>[]
    ) => {
      setLoading(true);
      setPagination({
        pageSize: p.pageSize,
        current: p.current,
        total: p.total,
        size: "default",
      });
      setTableData([]);
      loadData("", {}, p.current, p.pageSize);
    },
    [setPagination, setLoading]
  );
  const onDelete = useCallback(() => {
    setLoading(true);
    syncManagerService
      .batchDeleteHistoryItem(selectedRowKeys)
      .then((res) => {
        message.success("删除成功");
        setSelectedRowKeys([]);
        loadData("", {}, pagination.current, pagination.pageSize);
      })
      .catch((e) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedRowKeys]);
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (value: string) => <StyledP title={value}>{value}</StyledP>,
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
      columnWidth: "30rem",
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
        <div></div>
        <Button
          danger
          onClick={onDelete}
          disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}
        >
          删除
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
        onChange={onChange}
      />
    </section>
  );
}
