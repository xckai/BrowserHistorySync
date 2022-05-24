namespace SyncManagerApi.Models.RequestDto;

public record HistorySyncItemDto
{
    public string Url { get; set; }
    public string Title { get; set; }
    public string? FaviconUrl { get; set; }
    public string? Referrer { get; set; }
    
}