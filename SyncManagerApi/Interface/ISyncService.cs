using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Interface;

public interface ISyncService
{
    public Task BatchSync(List<HistoryDto>? histories, EquipmentInfo? equipmentInfo);

    public Task<Pagination<BrowserHistory>> Query(string keyword, int pageSize, int pageIndex);
    public Task<Pagination<BrowserHistory>> Query(QueryParams queryParams, int pageSize, int pageIndex);
}