import Avatar from 'antd/lib/avatar';
import List from 'antd/lib/list';
import moment from 'moment';
import React, { PureComponent, useEffect, useState, version } from 'react';
import { RecentHistoryList } from 'src/Component/RecentHistoryList';
import { SearchInput } from 'src/Component/SearchInput';
import { IHistoryInfo, syncManagerService } from 'src/Services/SyncManagerService';
import { Logo } from '../Component/Logo';
export default function Page1() {
  const [historyList, setHistoryList] = useState([] as Array<IHistoryInfo>);

  useEffect(() => {
    async function getLatestHistoryList() {
      let res = await syncManagerService.queryHistoryList();
      console.log(res)
      setHistoryList(res.data?.data);
    };
    getLatestHistoryList();
  }, []);

  return (
    <section>
      <div className="bar"><Logo /></div>
      <SearchInput />
      <RecentHistoryList data={historyList} />
    </section>
  );
}
