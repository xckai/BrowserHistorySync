namespace SyncManagerApi.Models.ResponseDto;

public class QueryParams
{
    public string? Keyword { get; set; }
    public DateTimeOffset? DateFrom { get; set; }
    public DateTimeOffset? DateTo { get; set; }
    public List<string>? Equipments { get; set; }
}