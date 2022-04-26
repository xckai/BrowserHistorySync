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
export interface SearchParams {
  dateFrom?: moment.Moment;
  dateTo?: moment.Moment;
  equipmentName?: string;
}
class SyncManagerService {
  async queryHistoryList(keyword?: string, searchParam?: SearchParams, pageIndex = 1, pageSize = 15) {
    console.log(window.syncManagerConfig)
    if (!window.syncManagerConfig || !window.syncManagerConfig.dataServerUrl) {
      throw new Error("No remote server API config");
    }
    return axios.get<any, AxiosResponse<IPagination<IHistoryInfo>>>(`${window.syncManagerConfig?.dataServerUrl
      }/api/UrlHistory/Query`, {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword,
        dateFrom: searchParam?.dateFrom?.toISOString(),
        dateTo: searchParam?.dateTo?.toISOString(),
        equipments: searchParam?.equipmentName
      }
    });
  }
}

export const syncManagerService = new SyncManagerService();
