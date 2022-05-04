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
  syncManagerService,
} from "src/services/syncManagerServic";
import moment from "moment";
import { hashIntoColor, sendCommandMsg } from "src/commonLibary/utils";
interface SearchParams {
  dateFrom: string;
  dateTo: string;
  equipmentName: string;
}
export function SearchListItem(props: {
  data: IHistoryInfo;
  onClick(data: IHistoryInfo): void;
}) {
  return (
    <List.Item
      onClick={() => {
        props.onClick(props.data);
      }}
    >
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <Avatar
          className={css`
            min-width: 1.5rem;
            min-height: 1.5rem !important;
            width: 1.5rem !important;
            height: 1.5rem !important;
            margin-right: 0.2rem !important; ;
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
            <span style={{ flex: 1, fontWeight: "bolder" }}>
              {props.data.title}
            </span>
            <span style={{ fontSize: "80%", color: "gray" }}>
              {moment(props.data.timestamp).format("YYYY-MM-DD HH:mm")}
            </span>
          </div>

          <div
            style={{ display: "flex", width: "100%", alignItems: "flex-end" }}
          >
            <div
              style={{
                fontSize: "80%",
                color: "gray",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,

                paddingRight: 16,
              }}
            >
              {props.data.url}
            </div>
            <Tag
              style={{ borderRadius: 3 }}
              color={hashIntoColor(props.data.equipmentName)}
            >
              {props.data.equipmentName}
            </Tag>
          </div>
        </div>
      </div>
    </List.Item>
  );
}
let timer: any = 0;
export function SearchList() {
  const [historyList, setHistoryList] = useState([] as Array<IHistoryInfo>);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({} as SearchParams);
  let [value, setValue] = useState("");
  let [pagination, setPagination] = useState({ total: 0, current: 0 });
  function loadMoreData() {
    if (loading) {
      return;
    }
    setLoading(true);
    syncManagerService
      .queryHistoryList(value)
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
          margin: 1rem 1rem;
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
          value={value}
          prefix={<SearchOutlined />}
          onChange={(e) => {
            let val = e.target.value;
            setValue(val);
            handleSearch(val);
          }}
        />
        <Button
          className={css`
            margin: 0 0.5rem;
          `}
          shape="circle"
          icon={<SettingOutlined />}
        />
      </div>
      <div
        id="scrollableDiv"
        style={{
          maxHeight: "450px",
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Spin />
            </div>
          }
          endMessage={<Divider plain>已经到底啦 🤐</Divider>}
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
            dataSource={historyList}
            renderItem={(item: IHistoryInfo) => (
              <SearchListItem data={item} onClick={onClickItem} />
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}
