namespace SyncManagerApi.Models.DB;

public enum RuleTypeEnum
{
    Domain,
    DomainSuffix,
    DomainKeyword
}
public class ExcludeRule
{
    public int Id { get; set; }
    public RuleTypeEnum RuleType { get; set; }
    public string? Value { get; set; }
}