using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Interface;
using SyncManagerApi.Models;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Services;

public class HistoryFilterRuleService : IHistoryFilterRuleService
{
    private readonly BrowserHistoryContext _db;

    public HistoryFilterRuleService(BrowserHistoryContext db)
    {
        _db = db;
    }
    public async Task<bool> IsMatchExcludeRule(string url)
    {
        var rules = await _db.ExcludeRules.ToListAsync();
        var domain = new Uri(url).Host;
        return rules.Exists(rule =>
        {
            switch (rule.RuleType)
            {
                case RuleTypeEnum.Domain:
                {
                    return domain.Equals(rule.Value);
                }
                case RuleTypeEnum.DomainKeyword:
                {
                    return rule.Value != null && domain.Contains(rule.Value);
                }
                case RuleTypeEnum.DomainSuffix:
                {
                    return rule.Value != null && domain.EndsWith(rule.Value);
                }
                default:
                    return false;
            }
        });
    }

    public async Task<Pagination<ExcludeRule>> Query(string keyword, int pageSize, int pageIndex)
    {
        IQueryable<ExcludeRule> query = _db.ExcludeRules;
        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(rule => rule.Value != null && rule.Value.Contains(keyword));
        }
        var total = await query.CountAsync();
        return new Pagination<ExcludeRule>()
        {
            Total = total,
            Data = await query.Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(),
            PageSize = pageSize,
            Current = pageIndex
        };
    }

    public async Task<bool> AddRule(ExcludeRule rule)
    {
        await _db.ExcludeRules.AddAsync(rule);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteRule(int ruleId)
    {
        var toBeRemoved = await _db.ExcludeRules.FirstOrDefaultAsync(rule => rule.Id == ruleId);
        if (toBeRemoved == null)
        {
            throw new Exception("No rule founded");
        }
        _db.ExcludeRules.Remove(toBeRemoved);
         await _db.SaveChangesAsync();
         return true;
    }

    public async Task<bool> UpdateRule(ExcludeRule rule)
    {
        var toBeEdit = await _db.ExcludeRules.FirstOrDefaultAsync(r => r.Id == rule.Id);
        if (toBeEdit == null)
        {
            throw new Exception("No rule founded");
        }
        _db.Update(rule);
        await _db.SaveChangesAsync();
        return true;
    }
}