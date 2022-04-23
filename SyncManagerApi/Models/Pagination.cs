using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Models;

public class Pagination<T>
{
    public int Current { get; set; }
    public IList<T> Data { get; set; }
    public int PageSize { get; set; }
    public int Total { get; set; }
}