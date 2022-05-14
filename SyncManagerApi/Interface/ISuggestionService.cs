namespace SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
public interface ISuggestionService
{
    public Task<IList<BrowserHistory>> Query(string keyword, int size);
}