import {
  List,
  Avatar,
  Input,
  Skeleton,
  Divider,
  Spin,
  Tag,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  IHistoryInfo,
  SearchParams,
  syncManagerService,
} from "src/services/syncManagerService";
import moment from "moment";
import { hashIntoColor, sendCommandMsg } from "src/commonLibary/utils";
import _ from "lodash";

interface IHistoryInfoGroup {
  groupTitle: string;
  items: Array<IHistoryInfo>;
}
function SearchListItem(props: {
  data: IHistoryInfo;
  onClick(data: IHistoryInfo): void;
  onClickEquipmentTag(data: IHistoryInfo): void;
}) {
  return (
    <List.Item
      onClick={() => {
        props.onClick(props.data);
      }}
      title={
        moment(props.data.timestamp).format("YYYY-MM-DD HH:mm ") +
        props.data.url
      }
    >
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        `}
      >
        <Avatar
          className={css`
            min-width: 1rem;
            min-height: 1rem !important;
            width: 1rem !important;
            height: 1rem !important;
            margin-right: 0.5rem !important;
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
            <Tag
              className={css`
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
            </Tag>
          </div>
        </div>
      </div>
    </List.Item>
  );
}

function SearchListGroupItem(
  props: IHistoryInfoGroup & {
    onClick(data: IHistoryInfo): void;
    onClickEquipmentTag(data: IHistoryInfo): void;
  }
) {
  return (
    <>
      <Divider
        className={css`
          margin: 0 !important;
        `}
        plain
        key={props.groupTitle}
      >
        {props.groupTitle}
      </Divider>
      {props.items.map((item) => (
        <SearchListItem
          data={item}
          onClick={props.onClick}
          onClickEquipmentTag={props.onClickEquipmentTag}
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
      className={css`
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
export function SearchListGroup() {
  const [historyList, setHistoryList] = useState([] as Array<IHistoryInfo>);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({} as SearchParams);
  let [searchValue, setSearchValue] = useState("");
  let [pagination, setPagination] = useState({ total: 0, current: 0 });
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
      .queryHistoryList(searchValue)
      .then((res) => {
        setPagination({ total: res.data.total, current: res.data.current });
        setHistoryList([...historyList, ...res.data?.data]);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
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
        .queryHistoryList(val)
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
          setLoading(false);
        });
    }, 1000);
  }
  useEffect(() => {
    async function getLatestHistoryList() {
      syncManagerService
        .queryHistoryList()
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
          setLoading(false);
        });
    }
    setLoading(true);
    getLatestHistoryList();
  }, []);
  function onClickEquipmentTag(data: IHistoryInfo) {
    setSearchParams({ equipmentName: data.equipmentName });
  }
  function onClickItem(data: IHistoryInfo) {
    sendCommandMsg({
      type: "OpenNewTab",
      url: data.url,
    });
  }
  return (
    <>
      <div
        className={css`
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
        style={{
          marginTop: ".5rem",
          maxHeight: "450px",
          minHeight: "300px",
          overflow: "auto",
          padding: "0 4px",
          borderTop: "1px solid rgba(140, 140, 140, 0.35)",
          borderBottom: "1px solid rgba(140, 140, 140, 0.35)",
        }}
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
          <List
            loading={loading}
            itemLayout="horizontal"
            size="small"
            className={css`
              margin: 0.5rem 0rem;
              .ant-list-item {
                padding: 8px 8px !important;
                &:hover {
                  background-color: gainsboro;
                }
              }
            `}
            dataSource={List2Groups(historyList)}
            renderItem={(group: IHistoryInfoGroup) => (
              <SearchListGroupItem
                items={group.items}
                groupTitle={group.groupTitle}
                onClick={onClickItem}
                onClickEquipmentTag={onClickEquipmentTag}
              />
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}