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
import {
  IHistoryInfo,
  syncManagerService,
} from "src/services/syncManagerService";
import { Logo } from "../../Components/Logo";
import { SearchList, SearchListItem } from "./Components/SearchList";
import { SearchListGroup } from "./Components/SearchListGroup";
export default function Page1() {
  const [isInit, setIsInit] = useState(true);
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entires) => {
        if (entires[0]?.contentRect) {
          sendCommandMsg({
            type: "ResizeWindow",
            height: entires[0].contentRect.height,
            width: entires[0].contentRect.width,
          });
        }
      }),
    []
  );
  const onRefChanged = useCallback((node: HTMLElement) => {
    console.log(node);
    if (node != null) {
      resizeObserver.observe(node);
    }
  }, []);
  useRef(null);
  useEffect(() => {
    if (isInExtension()) {
      listenToParentMsg("SetConfig", (msg) => {
        window.syncManagerConfig = msg.syncManagerConfig;
        setIsInit(false);
      });
      sendCommandMsg({ type: "GetConfig" });
    } else {
      window.syncManagerConfig = {
        dataServerUrl: "",
      };
      setIsInit(false);
    }
  }, []);
  return (
    <section
      ref={onRefChanged}
      css={`
        width: 30rem;
      `}
    >
      <div className="bar">
        <Logo />
      </div>
      {isInit ? <Spin tip="正在初始化" /> : <SearchListGroup />}
    </section>
  );
}
