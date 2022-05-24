using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Models.RequestDto;
using SyncManagerApi.Models.ResponseDto;

namespace SyncManagerApi.Interface;

public interface IBrowserHistoryService
{
    public Task BatchSync(IList<HistorySyncItemDto>? historyItems, EquipmentInfoDto? equipmentInfo);
    public Task Delete(int id);
    public Task BatchDelete(IList<int> ids);
    public Task<Pagination<HistoryItemDto>> Query(string keyword, int pageSize, int pageIndex);
    public Task<Pagination<HistoryItemDto>> Query(QueryParams queryParams, int pageSize, int pageIndex);
}