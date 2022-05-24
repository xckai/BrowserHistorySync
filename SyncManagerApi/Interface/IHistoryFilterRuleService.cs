using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Models.ResponseDto;

namespace SyncManagerApi.Interface;

public interface IHistoryFilterRuleService
{
    public Task<bool> IsMatchExcludeRule(string url);
    public Task<Pagination<ExcludeRule>>  Query(string keyword,int pageSize,int pageIndex );
    public Task<bool> AddRule(ExcludeRule rule);
    public Task<bool> DeleteRule(int ruleId);
    public Task<bool> UpdateRule(ExcludeRule rule);
}