using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Interface;

public interface IBrowserHistoryService
{
    public Task BatchSync(List<HistoryDto>? historieDtos, EquipmentInfo? equipmentInfo);
    public Task Delete(int id);
    public Task<Pagination<BrowserHistory>> Query(string keyword, int pageSize, int pageIndex);
    public Task<Pagination<BrowserHistory>> Query(QueryParams queryParams, int pageSize, int pageIndex);
}