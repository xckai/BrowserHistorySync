
import { AxiosResponse } from 'axios';
import { BaseAuthAxiosService } from './baseAuthAxiosService';
import { IPagination } from './syncManagerService';
export type FilterRuleType = "Domain" | "DomainSuffix" | "DomainKeyword";
export interface IFilterRuleItem { id?: number, ruleType?: FilterRuleType, value?: string }

class FilterRuleService extends BaseAuthAxiosService {
  async getAllRules(pageIndex: number, pageSize: number) {
    return this.axiosClient.get<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `/api/FilterRule/Query`,
      {
        params: {
          pageIndex,
          pageSize
        }
      }
    )
    // return axios.get("https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN");
  }
  async delete(id: number) {
    return this.axiosClient.delete<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `/api/FilterRule?ruleId=` + id,
    );
    // return axios.get("https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN");
  }
  async create(filterRule: IFilterRuleItem) {
    return this.axiosClient.put<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `/api/FilterRule`, filterRule
    );
  }
  async update(filterRule: IFilterRuleItem) {
    return this.axiosClient.patch<any, AxiosResponse<IPagination<IFilterRuleItem>>>(
      `/api/FilterRule`, filterRule
    );
  }
}
export const filterRuleService = new FilterRuleService();