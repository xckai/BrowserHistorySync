using SyncMangerApi.Models.DB;

namespace SyncMangerApi.Models;

public class  Pagination<T>
{
    public int Total;
    public int Current;
    public int PageSize;
    public IList<HistoryDetail> Data;
};