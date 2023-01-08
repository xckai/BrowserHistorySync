using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Models.RequestDto;
using SyncManagerApi.Models.ResponseDto;
using SyncManagerApi.Utils;

namespace SyncManagerApi.Services;

public class BrowserHistoryService : IBrowserHistoryService
{
    private readonly BrowserHistoryContext _db;
    private readonly IHistoryFilterRuleService _ruleService;
    private readonly IMapper _mapper;
    public BrowserHistoryService(BrowserHistoryContext db, IHistoryFilterRuleService ruleService,IMapper mapper)
    {
        _db = db;
        _ruleService = ruleService;
        _mapper = mapper;
    }


    public async Task BatchSync(IList<HistorySyncItemDto>? historieDtos, EquipmentInfoDto equipmentInfoDto)
    {
        if (historieDtos != null)
        {
            var rules = await _db.ExcludeRules.ToListAsync();
            historieDtos = historieDtos
                .Where(dto => !_ruleService.IsMatchExcludeRule(dto.Url).GetAwaiter().GetResult()).ToList();
            if (historieDtos.Count > 0)
            {
                var toBeUpdate = new List<BrowserHistory>();
                var toBeInsert = new List<BrowserHistory>();
                foreach (var historyDto in historieDtos)
                {
                    var targetDt = DateTimeOffset.UtcNow.Subtract(new TimeSpan(0, 24, 0, 0)).ToUnixTimeSeconds();
                    var recordedItem = await _db.UrlHistories.Where(savedItem =>
                            equipmentInfoDto != null && savedItem.Url == historyDto.Url &&
                            equipmentInfoDto.EquipmentName == savedItem.EquipmentName && savedItem.Timestamp >= targetDt)
                        .FirstOrDefaultAsync();
                    if (recordedItem != null)
                    {
                        recordedItem.Url = historyDto.Url;
                        recordedItem.Title = historyDto.Title;
                        recordedItem.FaviconUrl = historyDto.FaviconUrl;
                        recordedItem.EquipmentName = equipmentInfoDto?.EquipmentName;
                        recordedItem.Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                        recordedItem.Referrer = historyDto.Referrer;
                        recordedItem.BrowserType = equipmentInfoDto?.BrowserType;
                        toBeUpdate.Add(recordedItem);
                    }
                    else
                        toBeInsert.Add(new BrowserHistory
                        {
                            Url = historyDto.Url,
                            Title = historyDto.Title,
                            FaviconUrl = historyDto.FaviconUrl,
                            EquipmentName = equipmentInfoDto?.EquipmentName,
                            Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
                            BrowserType = equipmentInfoDto?.BrowserType,
                            Referrer = historyDto.Referrer
                        });
                }

                if (toBeInsert.Count > 0) await _db.UrlHistories.AddRangeAsync(toBeInsert);

                if (toBeUpdate.Count > 0) _db.UrlHistories.UpdateRange(toBeUpdate);

                await _db.SaveChangesAsync();
            }
        }
    }


    public async Task Delete(int id)
    {
        var toBeDeleted = await _db.UrlHistories.FirstOrDefaultAsync(history => history.Id == id);
        if (toBeDeleted == null) throw new HttpRequestException("No history record founded");
        _db.UrlHistories.Remove(toBeDeleted);
        await _db.SaveChangesAsync();
    }

    public async Task BatchDelete(IList<int> ids)
    {
        var toBeDeleted = _db.UrlHistories.Where(history => ids.Contains(history.Id));
        if (toBeDeleted == null) throw new HttpRequestException("No history records founded");


        _db.UrlHistories.RemoveRange(toBeDeleted);
        await _db.SaveChangesAsync();
    }

    public async Task<Pagination<HistoryItemDto>> Query(string keyword, int pageSize, int pageIndex)
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
        return new Pagination<HistoryItemDto>
        {
            Current = pageIndex,
            Total = total,
            PageSize = pageSize,
            Data = _mapper.Map<List<HistoryItemDto>>(data)
        };
    }

    public async Task<Pagination<HistoryItemDto>> Query(QueryParams queryParams, int pageSize, int pageIndex)
    {
        IQueryable<BrowserHistory> query = _db.UrlHistories;

        if (queryParams.DateFrom != null)
        {
            queryParams.DateTo = queryParams.DateTo ?? DateTime.Now;
            query = query.Where(history =>
                history.Timestamp >= queryParams.DateFrom.Value.ToUnixTimeSeconds() &&
                history.Timestamp <= queryParams.DateTo.Value.ToUnixTimeSeconds());
        }

        if (!string.IsNullOrWhiteSpace(queryParams.Keyword))
        {
            if (StringHelper.IsUrlPrefix(queryParams.Keyword))
                query = query.Where(history =>
                    history.Title.Contains(queryParams.Keyword));
            else
                query = query.Where(history =>
                    history.Title.Contains(queryParams.Keyword)
                    || history.Url.Contains(queryParams.Keyword));
        }

        if (queryParams.Equipments != null && queryParams.Equipments.Count > 0)
            query = query.Where(history =>
                queryParams.Equipments.Contains(history.EquipmentName));

        var total = query.Count();
        var data = await query.OrderByDescending(urlHistory => urlHistory.Timestamp)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new Pagination<HistoryItemDto>
        {
            Current = pageIndex,
            Total = total,
            PageSize = pageSize,
            Data = _mapper.Map<List<HistoryItemDto>>(data)!
        };
    }
}