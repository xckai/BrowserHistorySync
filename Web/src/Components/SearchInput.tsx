import { css, cx } from "@emotion/css";
import { List, Select } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

import React, { PureComponent, useState, version } from "react";
import {
  IHistoryInfo,
  syncManagerService,
} from "src/services/syncManagerService";
const { Option } = Select;

export function SearchInput() {
  const { Option } = Select;
  const [searchResult, setSearchResult] = useState([] as Array<IHistoryInfo>);
  const [keyword, setKeyword] = useState("");
  const options = searchResult.map((item, idx) => (
    <Option className="search-input-option" key={idx + item.url}>
      {
        <List.Item.Meta
          avatar={<Avatar src={item.faviconUrl} />}
          title={<a href={item.url}>{item.title}</a>}
          description={
            <div>
              <span>{moment(item.timestamp).format("YYYY-MM-DD HH:mm")}</span>
            </div>
          }
        />
      }
    </Option>
  ));
  let timer: any = undefined;
  function handleSearch(value: string) {
    if (value) {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
      timer = setTimeout(() => {
        syncManagerService.queryHistoryList(value).then((res) => {
          setSearchResult(res.data?.data);
        });
      }, 300);
    } else {
      setSearchResult([]);
    }
  }
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        padding: 1rem;
      `}
    >
      <Select
        size="large"
        className={css`
          min-width: 20rem;
          max-width: 50rem;
          width: 100%;
          .ant-select-selector {
            border-radius: 5rem !important;
          }
        `}
        showSearch
        value={keyword}
        placeholder="请输入关键字"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
      >
        {options}
      </Select>
    </div>
  );
}
