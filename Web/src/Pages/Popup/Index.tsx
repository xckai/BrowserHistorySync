import { Button, Input, List, Spin } from "antd";
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
import {
  IHistoryInfo,
  syncManagerService,
} from "src/services/syncManagerService";
import { Logo } from "../../Components/Logo";
import { SearchList, SearchListItem } from "./Components/SearchList";
import { SearchListGroup } from "../../Components/SearchListGroup";
import { SettingFilled } from "@ant-design/icons";
export default function Page1() {
  const [isInit, setIsInit] = useState(false);
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entires) => {
        if (entires[0]?.contentRect) {
          sendCommandMsg({
            type: "ResizeWindow",
            height: entires[0].contentRect.height,
            width: undefined,
          });
        }
      }),
    []
  );
  const onRefChanged = useCallback((node: HTMLElement) => {
    if (node != null) {
      resizeObserver.observe(node);
    }
  }, []);
  function onClickItem(data: IHistoryInfo) {
    sendCommandMsg({
      type: "OpenNewTab",
      url: data.url,
    });
  }
  return (
    <section
      ref={onRefChanged}
      css={`
        width: 100%;
        background:#fff;
      `}
    >
      <div className="bar">
        <Logo />
      </div>
      {!isInit && <SearchListGroup
        css={`
            max-height: 500px;
          `}
        onClickItem={onClickItem}
        pageSize={15}
      />}
    </section>
  );
}
