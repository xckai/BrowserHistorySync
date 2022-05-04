import Avatar from "antd/lib/avatar";
import List from "antd/lib/list";
import moment from "moment";
import React from "react";
import { css, cx } from "@emotion/css";

import { IHistoryInfo } from "src/services/syncManagerServic";
export function RecentHistoryList(props: { data: Array<IHistoryInfo> }) {
  return (
    <List
      itemLayout="horizontal"
      size="small"
      className={css`
        margin: 0.5rem 1rem;
      `}
      dataSource={props.data}
      renderItem={(item: IHistoryInfo) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.faviconUrl} />}
            title={<a href={item.url}>{item.title}</a>}
            description={
              <div>
                <span>{moment(item.timestamp).format("YYYY-MM-DD HH:mm")}</span>
              </div>
            }
          />
        </List.Item>
      )}
    ></List>
  );
}
