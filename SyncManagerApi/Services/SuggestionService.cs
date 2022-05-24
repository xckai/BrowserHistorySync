using System.Security.Policy;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Interface;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Utils;

namespace SyncManagerApi.Services;

public class SuggestionService : ISuggestionService
{ 
    private readonly BrowserHistoryContext _db;
 
    public SuggestionService(BrowserHistoryContext db)
    {
        _db = db;
       
    }
    public async Task<IList<BrowserHistory>> Query(string keyword, int size)
    {
        keyword = keyword.Trim();
        if (string.IsNullOrEmpty(keyword))
        {
            return default;
        }
      

        var isNumAndEnch = @"^[a-z|A-Z|0-9|.]*$";
        var targetDt = DateTimeOffset.UtcNow.Subtract(new TimeSpan(365, 0, 0, 0)).ToUnixTimeSeconds();
        IEnumerable<BrowserHistory> candidates = new List<BrowserHistory>();
        
        if (Regex.IsMatch(keyword, isNumAndEnch) && !StringHelper.IsUrlPrefix(keyword))
        {
            var  byUrl= await _db.UrlHistories
                .Where(history => history.Url.Contains(keyword) && history.Timestamp > targetDt)
                .OrderByDescending(history => history.Timestamp).Take(size).ToListAsync();
            
            var byTitle = await _db.UrlHistories
                .Where(history => history.Title.Contains(keyword) && history.Timestamp > targetDt)
                .OrderByDescending(history => history.Timestamp).Take(size).ToListAsync();
            candidates = candidates.Concat(byUrl).Concat(byTitle);
        }
        else
        {
            if (StringHelper.IsUrlPrefix(keyword))
            {
                candidates = await _db.UrlHistories
                    .Where(history => history.Title.Contains(keyword) && history.Timestamp > targetDt)
                    .OrderByDescending(history => history.Timestamp).Take(size * 2).ToListAsync();
            }
            else
            {
                candidates = await _db.UrlHistories
                    .Where(history => (history.Title.Contains(keyword) || history.Url.Contains(keyword)) && history.Timestamp > targetDt)
                    .OrderByDescending(history => history.Timestamp).Take(size * 2).ToListAsync();
            }
        }

        var results = new List<PriorityItem>();
        foreach (var browserHistory in candidates)
        {
            if (new Uri(browserHistory.Url).Host.Contains(keyword))
            {
                results.Add(new PriorityItem()
                {
                    ItemData = browserHistory,
                    Priority = 100
                });
            }else if (browserHistory.Title.Contains(keyword))
            {
                results.Add(new PriorityItem()
                {
                    ItemData = browserHistory,
                    Priority = 80
                });
            }
            else
            {
                results.Add(new PriorityItem()
                {
                    ItemData = browserHistory,
                    Priority = 70
                });
            }
        }

        return results.OrderByDescending(item => item, Comparer<PriorityItem>.Create(((a, b) =>
                    {
                        if (a.Priority != b.Priority)
                        {
                            return a.Priority - b.Priority;
                        }

                        return a.ItemData.Timestamp > b.ItemData.Timestamp ? 1 : -1;
                    }
                ))).Select(item => item.ItemData).GroupBy(history => history.Title + history.Url)
            .Select(group => group.FirstOrDefault()).Take(size).ToList()!;

    }
    class PriorityItem
    {
        public int Priority { get; set; }
        public BrowserHistory ItemData { get; set; } = null!;
    }   
}