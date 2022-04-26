
using Microsoft.AspNetCore.Mvc;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Controllers;
[Route("api/[controller]")]
[ApiController]
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
        return StatusCode(201);
    }
    [HttpPatch]
    public async Task<ActionResult> Update([FromBody] ExcludeRule rule)
    {
        await _ruleService.UpdateRule(rule);
        return StatusCode(200);
    }
}