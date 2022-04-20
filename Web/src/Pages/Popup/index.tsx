import { css } from "@emotion/css";
import { Input, List, Spin } from "antd";
import React, {
  ChangeEventHandler,
  PureComponent,
  useEffect,
  useState,
  version,
} from "react";
import { listenToParentMsg, sendCommandMsg } from "src/commonLibary/utils";
import {
  IHistoryInfo,
  syncManagerService,
} from "src/services/syncManagerService";
import { Logo } from "../../Components/Logo";
import { SearchList, SearchListItem } from "./Components/SearchList";
const { Search } = Input;
let timer: any = undefined;

export default function Page1() {
  const [historyList, setHistoryList] = useState([] as Array<IHistoryInfo>);
  const [loading, setLoading] = useState(false);
  let [value, setValue] = useState("");
  const [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (window != window.top) {
      listenToParentMsg("SetConfig", (msg) => {
        window.syncManagerConfig = msg.syncManagerConfig;
        setIsInit(false);
      });
      sendCommandMsg({ type: "GetConfig" });
    } else {
      window.syncManagerConfig = {
        dataServerUrl: "http://localhost:5266",
      };
      setIsInit(false);
    }
  }, []);
  return (
    <section>
      <div className="bar">
        <Logo />
      </div>
      {isInit ? <Spin tip="正在初始化" /> : <SearchList />}
    </section>
  );
}
