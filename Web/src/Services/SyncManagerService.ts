import {
  AxiosResponse,
  default as axios
} from 'axios';


export interface IPagination<T> {
  current: number,
  total: number,
  data: Array<T>
}
export interface IHistoryInfo {
  url: string,
  title: string,
  faviconUrl: string,
  equipmentName: string,
  browserType: string,
  timestamp: string
}
class SyncManagerService {
  async queryHistoryList(keyword?: string) {
    return axios.get<any, AxiosResponse<IPagination<IHistoryInfo>>>('http://localhost:5266/api/UrlHistory/QueryUrlHistory', {
      params: {
        pageIndex: 1,
        pageSize: 10,
        keyword: keyword
      }
    });
  }
}

export const syncManagerService = new SyncManagerService();
