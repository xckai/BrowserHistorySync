import {
  AxiosResponse,
  default as axios
} from 'axios';

export interface IPagination<T> {
  current: number;
  total: number;
  data: Array<T>;
  pageSize: number;
}
export interface IHistoryInfo {
  id?: number;
  url: string;
  title: string;
  faviconUrl: string;
  equipmentName: string;
  browserType: string;
  timestamp: string;
}
export interface SearchParams {
  keyword?: string;
  datetimeFrom?: moment.Moment;
  datetimeTo?: moment.Moment;
  equipmentName?: string;
  pageIndex?: number;
  pageSize?:number
}
class SyncManagerService {
  async queryHistoryList(
    searchParam?: SearchParams
  ) {
    console.log(searchParam,"searchParam")
    return axios.get<any, AxiosResponse<IPagination<IHistoryInfo>>>(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/UrlHistory/Query`,
      {
        params: {
          pageIndex: searchParam.pageIndex ?? 1,
          pageSize: searchParam.pageSize ?? 15,
          keyword: searchParam.keyword,
          dateFrom: searchParam?.datetimeFrom?.toISOString(),
          dateTo: searchParam?.datetimeTo?.toISOString(),
          equipments: searchParam?.equipmentName,
        },
      }
    );
  }
  async deleteHistoryItem(id: number) {
    return axios.delete(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/UrlHistory?id=${id}`
    );
  }
   async batchDeleteHistoryItem(ids: Array<number>) {
    return axios.delete(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/UrlHistory/BatchDelete`, {
        data: ids
      }
    );
  }
}

export const syncManagerService = new SyncManagerService();
