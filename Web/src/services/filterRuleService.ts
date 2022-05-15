import {
  AxiosResponse,
  default as axios
} from 'axios';
import { get, map, trim } from 'lodash';
import { getRecommendResolution4BingWallpaper } from 'src/commonLibary/utils';
import { IPagination } from './syncManagerService';
export type FilterRuleType = "Domain" | "DomainSuffix" | "DomainKeyword";
export interface IFilterRuleItem { id?:number ,ruleType?:FilterRuleType,value?:string }

class FilterRuleService{
  async getAllRules(pageIndex:number,pageSize:number) {
    return axios.get<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/FilterRule/Query`,
      {
        params: {
          pageIndex,
          pageSize
      }}
    );
    // return axios.get("https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN");
  }
   async delete(id:number) {
    return axios.delete<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/FilterRule?ruleId=`+id,
    );
    // return axios.get("https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN");
   }
  async create(filterRule: IFilterRuleItem) {
    return axios.put<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/FilterRule`, filterRule
    );
  }
  async update(filterRule: IFilterRuleItem) {
    return axios.patch<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/FilterRule`, filterRule
    );
  }
}
export const filterRuleService = new FilterRuleService();