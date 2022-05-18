using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Utils;

namespace SyncManagerApi.Services;

public class BrowserHistoryService : IBrowserHistoryService
{
    private readonly BrowserHistoryContext _db;
    private readonly IHistoryFilterRuleService _ruleService;

    public BrowserHistoryService(BrowserHistoryContext db, IHistoryFilterRuleService ruleService)
    {
        _db = db;
        _ruleService = ruleService;
    }


    public async Task BatchSync(IList<HistoryDto>? historieDtos, EquipmentInfo equipmentInfo)
    {
        if (historieDtos != null)
        {
            var rules = await _db.ExcludeRules.ToListAsync(); historieDtos = historieDtos
                .Where((dto) => !_ruleService.IsMatchExcludeRule(dto.Url).GetAwaiter().GetResult()).ToList();
            if (historieDtos.Count > 0)
            {
                var toBeUpdate = new List<BrowserHistory>();
                var toBeInsert = new List<BrowserHistory>();
                foreach (var historyDto in historieDtos)
                {
                    var targetDt = DateTime.UtcNow.Subtract(new TimeSpan(0, 24, 0, 0));
                    var recordedItem = await _db.UrlHistories.Where(savedItem =>
                            savedItem.Url == historyDto.Url && equipmentInfo.EquipmentName == savedItem.EquipmentName
                                                            && savedItem.Timestamp >= targetDt)
                        .FirstOrDefaultAsync();
                    if (recordedItem != null)
                    {
                        toBeUpdate.Add(new BrowserHistory()
                        {
                            Id = recordedItem.Id,
                            Url = historyDto.Url,
                            Title = historyDto.Title,
                            FaviconUrl = historyDto.FaviconUrl,
                            EquipmentName = equipmentInfo?.EquipmentName,
                            Timestamp = DateTime.UtcNow,
                            BrowserType = equipmentInfo?.BrowserType,
                            Referrer = historyDto.Referrer
                        });
                    }
                    else
                    {
                        toBeInsert.Add(new BrowserHistory()
                        {
                            Url = historyDto.Url,
                            Title = historyDto.Title,
                            FaviconUrl = historyDto.FaviconUrl,
                            EquipmentName = equipmentInfo?.EquipmentName,
                            Timestamp = DateTime.UtcNow,
                            BrowserType = equipmentInfo?.BrowserType,
                            Referrer = historyDto.Referrer
                        });
                    }
                }

                if (toBeInsert.Count > 0)
                {
                    await _db.UrlHistories.AddRangeAsync(toBeInsert);
                }

                if (toBeUpdate.Count > 0)
                {
                    _db.UrlHistories.UpdateRange(toBeUpdate);
                }

                await _db.SaveChangesAsync();
            }
        }
    }


    public async Task Delete(int id)
    {
        var toBeDeleted = await _db.UrlHistories.FirstOrDefaultAsync(history => history.Id == id);
        if (toBeDeleted == null)
        {
            throw new HttpRequestException("No history record founded");
        }
        _db.UrlHistories.Remove(toBeDeleted);
        await _db.SaveChangesAsync();
    }

    public async Task BatchDelete(IList<int> ids)
    {
        var toBeDeleted =  _db.UrlHistories.Where(history => ids.Contains(history.Id));
        if (toBeDeleted == null)
        {
            throw new HttpRequestException("No history records founded");
        }


        _db.UrlHistories.RemoveRange(toBeDeleted);
        await _db.SaveChangesAsync();
    }

    public async Task<Pagination<BrowserHistory>> Query(string keyword, int pageSize, int pageIndex)
    {
        var query = string.IsNullOrWhiteSpace(keyword)
            ? _db.UrlHistories
            : _db.UrlHistories.Where(history => history.Title.Contains(keyword)
                                                || history.Url.Contains(keyword));
        var total = query.Count();
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
            
            if (StringHelper.IsUrlPrefix(queryParams.Keyword))
            {
                query = query.Where(history =>
                    history.Title.Contains(queryParams.Keyword));
            }
            else
            {
                query = query.Where(history =>
                    (history.Title.Contains(queryParams.Keyword)
                     || history.Url.Contains(queryParams.Keyword)));
            }
        }

        if (queryParams.Equipments != null && queryParams.Equipments.Count > 0)
        {
            query = query.Where(history =>
                queryParams.Equipments.Contains(history.EquipmentName));
        }

        var total = query.Count();
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