using SyncMangerApi.Models;
using SyncMangerApi.Models.DB;

namespace SyncMangerApi.Interface;

public interface ISyncService
{
    public Task BatchSync(List<HistoryDto>? histories, EquipmentInfo? equipmentInfo);

    public Task<Pagination<HistoryDetail>> Query(string keyword, int pageSize, int pageIndex);
}