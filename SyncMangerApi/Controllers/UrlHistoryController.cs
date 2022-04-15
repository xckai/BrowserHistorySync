using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SyncMangerApi.Models;

namespace SyncMangerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlHistoryController : ControllerBase
    {
        private BrowserHistoryContext _db;

        public UrlHistoryController(BrowserHistoryContext db)
        {
            _db = db;
        }
        [HttpPost("BatchSyncUrlHistory")]
        public async Task<ActionResult> BatchSyncUrlHistory([FromBody] List<HistoryDetail> histories)
        {
            await _db.UrlHistories.AddRangeAsync(histories.Select(detail => new UrlHistory()
            {
                HistoryDetail = detail,
                Timestamp = DateTime.UtcNow
            }));
           await _db.SaveChangesAsync();
           return NoContent();
        }
        [HttpGet("SearchUrlHistory")]
        public async Task<List<HistoryDetail?>> SearchUrlHistory(string? keywords)
        {
            if (String.IsNullOrWhiteSpace(keywords))
            {
                return await _db.UrlHistories.OrderBy(
                    history => history.Timestamp).Take(10).Select(urlHistory =>urlHistory.HistoryDetail ).ToListAsync();
            }
            else
            {
                return await _db.UrlHistories.Where(urlHistory =>
                    urlHistory.HistoryDetail != null && (urlHistory.HistoryDetail.Title.Contains(keywords) ||
                                                         urlHistory.HistoryDetail.Url.Contains(keywords))).OrderBy(
                    history => history.Timestamp).Take(10).Select(urlHistory => urlHistory.HistoryDetail).ToListAsync();
            }
           
        }
    }
}
