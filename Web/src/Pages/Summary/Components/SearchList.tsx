import { List, Avatar, Input, Skeleton, Divider, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { SearchOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  IHistoryInfo,
  syncManagerService,
} from "src/services/syncManagerService";
import moment from "moment";
export function SearchListItem(props: { data: IHistoryInfo }) {
  return (
    <List.Item>
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
            min-height: 1.5rem;
            margin-right: 0.5rem;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.2rem;
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

          <div style={{ width: "100%", paddingTop: 5 }}>
            <div
              style={{
                fontSize: "80%",
                color: "gray",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.data.url}
            </div>
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
  return (
    <>
      <div
        className={css`
          margin: 1rem 2rem;
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
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
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
                padding: 8px 0px !important;
              }
            `}
            dataSource={historyList}
            renderItem={(item: IHistoryInfo) => <SearchListItem data={item} />}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}
