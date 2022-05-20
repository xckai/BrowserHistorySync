import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  TablePaginationConfig,
} from "antd";
import { template } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  filterRuleService,
  IFilterRuleItem,
} from "src/services/filterRuleService";

export default function FilterRuleManager() {
  const [tableData, setTableData] = useState([] as Array<IFilterRuleItem>);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState("");
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showTotal: (total) => {
      return template("共 ${total} 条记录")({ total });
    },
  } as TablePaginationConfig);
  function loadData(pageIndex = 1, pageSize = 10) {
    setLoading(true);
    filterRuleService
      .getAllRules(pageIndex, pageSize)
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
        console.log(e.response);
        message.error(e.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    loadData(pagination.current, pagination.pageSize);
  }, []);
  const onDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        content: "确定删除",
        onOk: () => {
          filterRuleService
            .delete(id)
            .then((res) => {
              message.success("删除成功");
              loadData(pagination.current, pagination.pageSize);
            })
            .catch((e) => {
              console.error(e);
              message.error(e.message);
              setLoading(false);
            })
            .finally(() => {
              setLoading(false);
            });
        },
      });
    },
    [pagination, loadData, setLoading]
  );
  const onCreateSubmit = useCallback(
    (data: IFilterRuleItem) => {
      filterRuleService
        .create(data)
        .then((res) => {
          message.success("创建过滤规则成功");
          setModalState("");
          form.setFieldsValue({});
          loadData(pagination.current, pagination.pageSize);
        })
        .catch((e) => {
          console.error(e);
          message.error(e.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [form, modalState, pagination, setModalState]
  );
  const onEditSubmit = useCallback(
    (data: IFilterRuleItem) => {
      filterRuleService
        .update(data)
        .then((res) => {
          message.success("更新过滤规则成功");
          setModalState("");
          form.setFieldsValue({});
          loadData(pagination.current, pagination.pageSize);
        })
        .catch((e) => {
          console.error(e);
          message.error(e.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [pagination, setModalState, form]
  );

  const columns = [
    {
      title: "ID",
      render: (value: number, item: IFilterRuleItem, idx: number) => idx + 1,
    },
    {
      title: "规则类型",
      dataIndex: "ruleType",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
    {
      title: "操作",
      render: (value: string, item: IFilterRuleItem) => (
        <Button.Group>
          <Button
            type="link"
            onClick={() => {
              setModalState("edit");
              form.setFieldsValue(item);
            }}
          >
            编辑
          </Button>
          <Button type="link" danger onClick={() => onDelete(item.id)}>
            删除
          </Button>
        </Button.Group>
      ),
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
          type="primary"
          loading={loading}
          onClick={() => {
            setModalState("create");
            form.resetFields();
            form.setFieldsValue({ ruleType: "Domain" });
          }}
        >
          新增
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey={(item: IFilterRuleItem) => item.id}
        dataSource={tableData}
        pagination={pagination}
        loading={loading}
      />
      <Modal
        onCancel={() => setModalState("")}
        visible={modalState == "edit" || modalState == "create"}
        title={modalState == "edit" ? "编辑过滤规则" : "新增过滤规则"}
        onOk={() => {
          form
            .validateFields()
            .then((res) => {
              if (modalState == "edit") {
                onEditSubmit(res);
              } else {
                onCreateSubmit(res);
              }
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      >
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} form={form}>
          <Form.Item
            label="过滤规则类型"
            name="ruleType"
            rules={[{ required: true, message: "请选择" }]}
          >
            <Select>
              <Select.Option value="Domain">Domain</Select.Option>
              <Select.Option value="DomainKeyword">DomainKeyword</Select.Option>
              <Select.Option value="DomainSuffix">DomainSuffix</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="值"
            rules={[{ required: true, message: "请输入" }]}
            name="value"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
