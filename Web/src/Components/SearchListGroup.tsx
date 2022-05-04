import {
  List,
  Avatar,
  Input,
  Divider,
  Spin,
  Tag,
  message,
  InputRef,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  IHistoryInfo,
  SearchParams,
  syncManagerService,
} from "src/services/syncManagerServic";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";

interface IHistoryInfoGroup {
  groupTitle: string;
  items: Array<IHistoryInfo>;
}
const StyledList = styled(List)`
  margin: 0.5rem 0rem;
`;
const StyledListItem = styled(List.Item)`
  padding: 8px 8px 8px 16px !important;
  .close_btn {
    visibility: hidden;
    opacity: 0.3;
  }
  &:hover {
    background-color: #e6e5e5;
    border-radius: 3px;
    .close_btn {
      visibility: visible;
      &:hover {
        color: #40a9ff;
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }
  .item_container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .ant-avatar {
      min-width: 1rem;
      min-height: 1rem !important;
      width: 1rem !important;
      height: 1rem !important;
      margin-right: 0.5rem !important;
    }
  }
`;
function SearchListItem(props: {
  data: IHistoryInfo;
  onClick(data: IHistoryInfo): void;
  onClickEquipmentTag(data: IHistoryInfo): void;
  onDeleteBtnClick(data: IHistoryInfo): void;
}) {
  return (
    <StyledListItem
      onClick={() => {
        props.onClick(props.data);
      }}
      title={`${props.data.equipmentName} ${moment(props.data.timestamp).format(
        "YYYY-MM-DD HH:mm "
      )} \n ${props.data.url}`}
    >
      <div className="item_container">
        <Avatar
          css={`
            border-radius: ${props.data.faviconUrl ? 0 : "50%"};
          `}
          src={props.data.faviconUrl}
        />
        <div style={{ flex: 1, width: "calc(100% - 1.7rem)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span style={{ flex: 1, fontSize: "90%" }}>{props.data.title}</span>

            {/* <Tag
              css={`
                cursor: pointer;
              `}
              style={{ borderRadius: 3 }}
              color={hashIntoColor(props.data.equipmentName)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onClickEquipmentTag(props.data);
              }}
            >
              {props.data.equipmentName}
            </Tag> */}
          </div>
        </div>
        <CloseCircleOutlined
          className="close_btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onDeleteBtnClick(props.data);
          }}
        />
      </div>
    </StyledListItem>
  );
}

function SearchListGroupItem(
  props: IHistoryInfoGroup & {
    onClick(data: IHistoryInfo): void;
    onClickEquipmentTag(data: IHistoryInfo): void;
    onDeleteItem(data: IHistoryInfo): void;
  }
) {
  return (
    <>
      <Divider
        css={`
          margin: 0 !important;
        `}
        plain
        key={props.groupTitle}
      >
        {props.groupTitle}
      </Divider>
      {props.items.map((item, idx) => (
        <SearchListItem
          data={item}
          key={item.url + " " + idx}
          onClick={props.onClick}
          onClickEquipmentTag={props.onClickEquipmentTag}
          onDeleteBtnClick={props.onDeleteItem}
        />
      ))}
    </>
  );
}
function SearchParamBar(props: {
  data: SearchParams;
  onChange: (param: SearchParams) => void;
}) {
  return props.data.equipmentName || props.data.dateTo ? (
    <div
      css={`
        margin: 0px 1rem 5px 1rem;
      `}
    >
      <span style={{ marginRight: ".5rem" }}>Filter:</span>
      {props.data.equipmentName && (
        <Tag
          closable
          onClose={() => {
            props.onChange({
              ...props.data,
              equipmentName: undefined,
            });
          }}
        >
          {props.data.equipmentName}
        </Tag>
      )}
      {props.data.dateFrom && (
        <Tag
          closable
          onClose={() => {
            props.onChange({
              ...props.data,
              dateFrom: undefined,
              dateTo: undefined,
            });
          }}
        >
          {props.data.dateFrom.format("YY/MM/DD") +
            "-" +
            props.data.dateTo.format("YY/MM/DD")}
        </Tag>
      )}
    </div>
  ) : null;
}
let timer: any = 0;
export function SearchListGroup(props: {
  onClickItem: (item: IHistoryInfo) => void;
  pageSize: number;
  className?: string;
}) {
  const [historyList, setHistoryList] = useState([] as Array<IHistoryInfo>);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({} as SearchParams);
  let [searchValue, setSearchValue] = useState("");
  let [pagination, setPagination] = useState({ total: 0, current: 1 });
  const inputRef = useRef<InputRef>();
  useEffect(() => {
    async function getLatestHistoryList() {
      syncManagerService
        .queryHistoryList("", {}, pagination.current, props.pageSize)
        .then((res) => {
          setPagination({
            total: res.data.total,
            current: res.data.current,
          });
          setHistoryList(res.data?.data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          message.error(e.message);
          setLoading(false);
        });
    }
    setLoading(true);
    getLatestHistoryList();
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, []);
  function List2Groups(list: Array<IHistoryInfo>) {
    return _(list)
      .groupBy((item) => moment(item.timestamp).format("YYYY-MM-DD A"))
      .map(
        (g) =>
          ({
            groupTitle: moment(g[0].timestamp).format("YYYY-MM-DD A"),
            items: g,
          } as IHistoryInfoGroup)
      )
      .value();
  }
  function loadMoreData() {
    if (loading) {
      return;
    }
    setLoading(true);
    syncManagerService
      .queryHistoryList(
        searchValue,
        searchParams,
        pagination.current + 1,
        props.pageSize
      )
      .then((res) => {
        setPagination({ total: res.data.total, current: res.data.current });
        setHistoryList([...historyList, ...res.data?.data]);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        message.error(e.message);
        setLoading(false);
      });
  }
  function handleSearch(val: string) {
    setLoading(true);
    setHistoryList([]);
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    timer = setTimeout(function () {
      syncManagerService
        .queryHistoryList(val, searchParams, 1, props.pageSize)
        .then((res) => {
          setPagination({
            total: res.data.total,
            current: res.data.current,
          });
          setHistoryList(res.data?.data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          message.error(e.message);
          setLoading(false);
        });
    }, 500);
  }

  function onClickEquipmentTag(data: IHistoryInfo) {
    setSearchParams({ equipmentName: data.equipmentName });
  }

  function handleDelete(data: IHistoryInfo) {
    if (data.id) {
      syncManagerService
        .deleteHistoryItem(data.id)
        .then((res) => {
          let newList = historyList.filter((item) => item.id !== data.id);
          message.success("删除成功");
          setHistoryList([...newList]);
        })
        .catch((e) => {
          console.error(e);
          message.error(e.message);
        });
    }
  }
  return (
    <section
      className={props.className}
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          margin: 1rem 1rem 0.5rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .ant-input-affix-wrapper {
            border-radius: 2rem !important;
            border-radius: 2rem !important;
          }
        `}
      >
        <Input
          ref={inputRef}
          size="large"
          placeholder="搜索历史访问记录"
          allowClear
          value={searchValue}
          prefix={<SearchOutlined />}
          onChange={(e) => {
            let val = e.target.value;
            setSearchValue(val);
            handleSearch(val);
          }}
        />
        {/* <Button
          className={css`
            margin: 0 0.5rem;
          `}
          shape="circle"
          icon={<SettingOutlined />}
        /> */}
      </div>
      <SearchParamBar data={searchParams} onChange={setSearchParams} />
      <div
        id="scrollableDiv"
        css={`
          margin-top: 0.5rem;
          flex: 1;
          overflow: auto;
        `}
      >
        <InfiniteScroll
          dataLength={historyList.length}
          next={loadMoreData}
          hasMore={historyList.length < pagination.total}
          loader={
            !loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Spin />
              </div>
            )
          }
          endMessage={!loading && <Divider plain>已经到底啦 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <StyledList
            loading={loading}
            itemLayout="horizontal"
            size="small"
            dataSource={List2Groups(historyList)}
            renderItem={(group: IHistoryInfoGroup) => (
              <SearchListGroupItem
                key={group.groupTitle}
                items={group.items}
                groupTitle={group.groupTitle}
                onClick={props.onClickItem}
                onClickEquipmentTag={onClickEquipmentTag}
                onDeleteItem={handleDelete}
              />
            )}
          />
        </InfiniteScroll>
      </div>
    </section>
  );
}
