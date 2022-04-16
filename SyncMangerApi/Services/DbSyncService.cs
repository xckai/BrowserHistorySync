using Microsoft.EntityFrameworkCore;
using SyncMangerApi.Interface;
using SyncMangerApi.Models;
using SyncMangerApi.Models.DB;

namespace SyncMangerApi.Services;

public class DbSyncService : ISyncService
{
    private readonly BrowserHistoryContext _db;

    public DbSyncService(BrowserHistoryContext db)
    {
        _db = db;
    }


    public async Task BatchSync(List<HistoryDto>? histories, EquipmentInfo? equipmentInfo)
    {
        if (histories != null)
        {
            await _db.UrlHistories.AddRangeAsync(histories.Select(history => new UrlHistory()
            {
                HistoryDetail = new HistoryDetail()
                {
                    Url = history.Url,
                    Title = history.Title,
                    FaviconUrl = history.FaviconUrl,
                    EquipmentName = equipmentInfo?.EquipmentName,
                    Timestamp = DateTime.UtcNow,
                    BrowserType = equipmentInfo?.BrowserType
                },
                Timestamp = DateTime.UtcNow
            }));
            await _db.SaveChangesAsync();
        }
    }

    public async Task<Pagination<HistoryDetail>> Query(string keyword, int pageSize, int pageIndex)
    {

        var query = string.IsNullOrWhiteSpace(keyword)
            ? _db.UrlHistories
            : _db.UrlHistories.Where(history => history.HistoryDetail != null && history.HistoryDetail.Title != null && (history.HistoryDetail.Title.Contains(keyword)
                || history.HistoryDetail.Url.Contains(keyword)));
        var total = query.Count();
        var data = query.OrderBy(urlHistory =>urlHistory.Timestamp).Take(new Range((pageIndex - 1) * pageSize, pageIndex * pageSize - 1))
            .Select(urlHistory => urlHistory.HistoryDetail);
        return new Pagination<HistoryDetail>()
        {
            Current = pageIndex,
            Total = total,
            PageSize = pageSize,
            Data = (await data.ToListAsync())!
        };
    }
}