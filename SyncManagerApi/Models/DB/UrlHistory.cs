namespace SyncManagerApi.Models.DB;

public class UrlHistory
{
    public int Id { get; set; }
    public HistoryDetail? HistoryDetail { get; set; }
    public DateTime? Timestamp { get; set; }
}