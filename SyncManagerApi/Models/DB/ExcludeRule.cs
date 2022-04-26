using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace SyncManagerApi.Models.DB;


[JsonConverter(typeof(StringEnumConverter))]
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