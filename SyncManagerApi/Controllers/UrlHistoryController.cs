using Microsoft.AspNetCore.Mvc;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Services;

namespace SyncManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlHistoryController : ControllerBase
    {
        private readonly DbSyncService _dbSyncService;

        public UrlHistoryController(DbSyncService dbSyncService)
        {
            _dbSyncService = dbSyncService;
        }
        [HttpPost("BatchSyncUrlHistory")]
        public async Task<ActionResult> BatchSyncUrlHistory(BatchSyncRequestDto batchSyncRequestDto)
        {
            await _dbSyncService.BatchSync(batchSyncRequestDto.HistoryList, batchSyncRequestDto.EquipmentInfo);
           return NoContent();
        }
        [HttpGet("QueryUrlHistory")]
        public async Task<Pagination<BrowserHistory>> QueryUrlHistory(string? keyword="",int pageSize =10, int pageIndex =1)
        {
            return await _dbSyncService.Query(keyword ?? "", pageSize, pageIndex);
        }
        [HttpGet("Query")]
        public async Task<Pagination<BrowserHistory>> QueryUrlHistory(string? keyword,string? equipments, DateTimeOffset? dateFrom, DateTimeOffset? DateTo, int pageSize =10, int pageIndex =1)
        {
            
            return await _dbSyncService.Query(new QueryParams()
            {
                Keyword = keyword,
                DateFrom = dateFrom,
                DateTo = DateTo,
                Equipments = string.IsNullOrWhiteSpace(equipments)? null : equipments.Split(';').Select(value=>value.Trim()).ToList()
            },pageSize,pageIndex);
        }
    }
}
