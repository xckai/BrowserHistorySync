import { css } from "@emotion/css";
import { Input, List } from "antd";
import React, {
  ChangeEventHandler,
  PureComponent,
  useEffect,
  useState,
  version,
} from "react";
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

  return (
    <section>
      <div className="bar">
        <Logo />
      </div>
      <SearchList />
    </section>
  );
}
