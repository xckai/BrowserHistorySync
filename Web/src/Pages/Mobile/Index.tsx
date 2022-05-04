import { Input, List, Spin } from "antd";
import React, {
  ChangeEventHandler,
  PureComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  version,
} from "react";
import {
  isInExtension,
  listenToParentMsg,
  sendCommandMsg,
} from "src/commonLibary/utils";
import { SearchListGroup } from "src/Components/SearchListGroup";
import { IHistoryInfo } from "src/services/syncManagerService";
import { Logo } from "../../Components/Logo";
export default function Mobile() {
  function onClickItem(data: IHistoryInfo) {
    window.open(data.url);
  }
  return (
    <section
      css={`
        width: 100%;
        height: 100vh;
      `}
    >
      <div className="bar">
        <Logo />
      </div>
      <SearchListGroup
        css={`
          height: 100%;
          height: calc(100% - 64px);
        `}
        onClickItem={onClickItem}
        pageSize={50}
      />
    </section>
  );
}
