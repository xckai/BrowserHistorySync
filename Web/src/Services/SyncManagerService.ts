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
  id?: number
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
  async deleteHistoryItem(id: number) {

    return axios.delete(`${window.syncManagerConfig?.dataServerUrl
      }/api/UrlHistory?id=${id}`);
  }
}

export const syncManagerService = new SyncManagerService();
