namespace SyncMangerApi.Models;

public record HistoryDto()
{
    public string Url { get; set; }
    public string Title { get; set; }
    public string? FaviconUrl { get; set; }
}