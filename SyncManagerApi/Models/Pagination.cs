using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Models;

public class Pagination<T>
{
    public int Current;
    public IList<HistoryDetail> Data;
    public int PageSize;
    public int Total;
}