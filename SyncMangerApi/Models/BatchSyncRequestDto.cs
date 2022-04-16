namespace SyncMangerApi.Models;

public record BatchSyncRequestDto()
{
    public EquipmentInfo? EquipmentInfo { get; set; }
    public List<HistoryDto>? HistoryList { get; set; }
}