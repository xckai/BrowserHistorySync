using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Extensions;
using SyncManagerApi.Interface;
using SyncManagerApi.Mapper;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Services;
using SyncMangerApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
// Cookie Settings
builder.UseCookieAuth();

// private DI
builder.Services.AddScoped<IBrowserHistoryService, BrowserHistoryService>();
builder.Services.AddScoped<IHistoryFilterRuleService, HistoryFilterRuleService>();
builder.Services.AddScoped<ISuggestionService, SuggestionService>();
builder.Services.AddAutoMapper(typeof(MapperProfile));

builder.ConfigDbContext();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// RespCompression
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.MimeTypes =
        ResponseCompressionDefaults.MimeTypes;
});


builder.WebHost.UseKestrel();
var app = builder.Build();
// DB migration
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetService<BrowserHistoryContext>();
    if (dbContext != null) await dbContext.Database.MigrateAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors(policyBuilder =>
{
    policyBuilder.AllowCredentials().AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowedToAllowWildcardSubdomains()
        .WithOrigins("http://localhost:9000")
        .WithOrigins("http://*.local.me:9000");
});

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.UseResponseCompression();
app.UseSpaStatic(Path.Join("./wwwroot", "index.html"));


app.Run();