using Microsoft.AspNetCore.Mvc;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Services;
using Microsoft.AspNetCore.Authorization;
namespace SyncManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UrlHistoryController : ControllerBase
    {
        private readonly IBrowserHistoryService _browserHistoryService;

        public UrlHistoryController(IBrowserHistoryService browserHistoryService)
        {
            _browserHistoryService = browserHistoryService;
        }
        [HttpPost("BatchSyncUrlHistory")]
        [HttpPost("BatchSync")]
        public async Task<ActionResult> BatchSyncUrlHistory(BatchSyncRequestDto batchSyncRequestDto)
        { 
            await _browserHistoryService.BatchSync(batchSyncRequestDto.HistoryList, batchSyncRequestDto.EquipmentInfo);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteHistory(int id)
        {
            await _browserHistoryService.Delete(id);
            return Ok();
        }
        [HttpDelete("BatchDelete")]
        public async Task<ActionResult> BatchDeleteHistory([FromBody] IList<int> ids)
        {
            await _browserHistoryService.BatchDelete(ids);
            return Ok();
        }
        [HttpGet("QueryUrlHistory")]
        public async Task<Pagination<BrowserHistory>> QueryUrlHistory(string? keyword="",int pageSize =10, int pageIndex =1)
        {
            return await _browserHistoryService.Query(keyword ?? "", pageSize, pageIndex);
        }
        [HttpGet("Query")]
        public async Task<Pagination<BrowserHistory>> QueryUrlHistory(string? keyword,string? equipments, DateTimeOffset? dateFrom, DateTimeOffset? DateTo, int pageSize =10, int pageIndex =1)
        {
            
            return await _browserHistoryService.Query(new QueryParams()
            {
                Keyword = keyword,
                DateFrom = dateFrom,
                DateTo = DateTo,
                Equipments = string.IsNullOrWhiteSpace(equipments)? null : equipments.Split(';').Select(value=>value.Trim()).ToList()
            },pageSize,pageIndex);
        }
    }
}
