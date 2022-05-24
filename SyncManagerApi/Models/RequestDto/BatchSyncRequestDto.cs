namespace SyncManagerApi.Models.RequestDto;

public record BatchSyncRequestDto{
    public EquipmentInfoDto? EquipmentInfo { get; set; }
    public List<HistorySyncItemDto>? HistoryList { get; set; }
}