namespace SyncManagerApi.Models.DB;

public class HistoryDetail
{
    public string Url { get; set; }
    public string? Title { get; set; }
    public string? FaviconUrl { get; set; }
    public DateTime? Timestamp { get; set; }
    public string? EquipmentName { get; set; }
    public string? BrowserType { get; set; }
}