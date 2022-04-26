using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Services;

public class BrowserHistoryService : IBrowserHistoryService
{
    private readonly BrowserHistoryContext _db;
    private readonly IHistoryFilterRuleService _ruleService;
    public BrowserHistoryService(BrowserHistoryContext db,IHistoryFilterRuleService ruleService)
    {
        _db = db;
        _ruleService = ruleService;
    }


    public async Task BatchSync(List<HistoryDto>? histories, EquipmentInfo? equipmentInfo)
    {
        if (histories != null)
        {
            var rules = await _db.ExcludeRules.ToListAsync();
            histories = histories.Where( (dto) => !_ruleService.IsMatchExcludeRule(dto.Url).GetAwaiter().GetResult()).ToList();
            if (histories != null && histories.Count > 0)
            {
                await _db.UrlHistories.AddRangeAsync(histories.Select(history => new BrowserHistory()
                {
                    Url = history.Url,
                    Title = history.Title,
                    FaviconUrl = history.FaviconUrl,
                    EquipmentName = equipmentInfo?.EquipmentName,
                    Timestamp = DateTime.UtcNow,
                    BrowserType = equipmentInfo?.BrowserType
                
                }));
                await _db.SaveChangesAsync();
            }
        }
    }

    public async Task<Pagination<BrowserHistory>> Query(string keyword, int pageSize, int pageIndex)
    {

        var query = string.IsNullOrWhiteSpace(keyword)
            ? _db.UrlHistories
            : _db.UrlHistories.Where(history => history.Title.Contains(keyword)
                || history.Url.Contains(keyword));
        var total =query.Count();
        var data = await query.OrderByDescending(urlHistory => urlHistory.Timestamp)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new Pagination<BrowserHistory>()
        {
            Current = pageIndex,
            Total = total,
            PageSize = pageSize,
            Data = data
        };
    }

    public async Task<Pagination<BrowserHistory>> Query(QueryParams queryParams, int pageSize, int pageIndex)
    {
        IQueryable<BrowserHistory> query = _db.UrlHistories;
        
        if (queryParams.DateFrom != null)
        {
            queryParams.DateTo = queryParams.DateTo ?? DateTime.Now;
            query = query.Where(history =>
                history.Timestamp >= queryParams.DateFrom &&
                history.Timestamp <= queryParams.DateTo);
        }
        if (!string.IsNullOrWhiteSpace(queryParams.Keyword))
        {
            query=query.Where(history =>
                                   (history.Title.Contains(queryParams.Keyword)
                                    || history.Url.Contains(queryParams.Keyword)));
            
        }

        if (queryParams.Equipments != null && queryParams.Equipments.Count >0)
        {
            query=query.Where(history =>
              queryParams.Equipments.Contains(history.EquipmentName));
        }

        var total =query.Count();
        var data = await query.OrderByDescending(urlHistory => urlHistory.Timestamp)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new Pagination<BrowserHistory>()
        {
            Current = pageIndex,
            Total = total,
            PageSize = pageSize,
            Data = data!
        };
    }
    
}