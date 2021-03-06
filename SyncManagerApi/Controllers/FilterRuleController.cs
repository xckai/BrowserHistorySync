
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Models.ResponseDto;

namespace SyncManagerApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FilterRuleController : Controller
{
    private IHistoryFilterRuleService _ruleService;

    public FilterRuleController(IHistoryFilterRuleService ruleService)
    {
        _ruleService = ruleService;
    }
   
    [HttpGet("Query")]
    public async Task<Pagination<ExcludeRule>> Query(string? keyword = "", int pageSize = 10, int pageIndex = 1)
    {
        return await _ruleService.Query(keyword, pageSize, pageIndex);
    }
    [HttpPut]
    public async Task<ActionResult> Add([FromBody] ExcludeRule rule)
    {
        await _ruleService.AddRule(rule);
        return StatusCode(201);
    }
    [HttpDelete]
    public async Task<ActionResult> Delete(int ruleId)
    {
        await _ruleService.DeleteRule(ruleId);
        return Ok();
    }
    [HttpPatch]
    public async Task<ActionResult> Update([FromBody] ExcludeRule rule)
    {
        await _ruleService.UpdateRule(rule);
        return Ok();
    }
}