using AutoMapper;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Models.ResponseDto;

namespace SyncManagerApi.Mapper;

public class MapperProfile:Profile
{
    public MapperProfile()
    {
        CreateMap<long, DateTimeOffset>().ConvertUsing(new DateTimeTypeConverter());
        CreateMap<BrowserHistory, HistoryItemDto>();
    }
}
public class DateTimeTypeConverter : ITypeConverter<long, DateTimeOffset>
{
    public DateTimeOffset Convert(long source, DateTimeOffset destination, ResolutionContext context)
    {
        return DateTimeOffset.FromUnixTimeSeconds(source);
    }
}