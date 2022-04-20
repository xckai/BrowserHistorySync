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
    console.log(window.syncManagerConfig)
    if (!window.syncManagerConfig || !window.syncManagerConfig.dataServerUrl) {
      throw new Error("No remote server API config");
    }
    return axios.get<any, AxiosResponse<IPagination<IHistoryInfo>>>(`${window.syncManagerConfig?.dataServerUrl
      }/api/UrlHistory/QueryUrlHistory`, {
      params: {
        pageIndex: 1,
        pageSize: 10,
        keyword: keyword
      }
    });
  }
}

export const syncManagerService = new SyncManagerService();
