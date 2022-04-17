using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Interface;

public interface ISyncService
{
    public Task BatchSync(List<HistoryDto>? histories, EquipmentInfo? equipmentInfo);

    public Task<Pagination<HistoryDetail>> Query(string keyword, int pageSize, int pageIndex);
}