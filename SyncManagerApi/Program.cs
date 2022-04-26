using System.Text.Json.Serialization;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Interface;
using SyncManagerApi.Models.DB;
using SyncManagerApi.Services;
using SyncMangerApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", builder => {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

    });
});
builder.Services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.IgnoreNullValues = true;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
Console.WriteLine(builder.Configuration.GetConnectionString("pgsql"));
builder.Services.AddScoped<IBrowserHistoryService,BrowserHistoryService>();
builder.Services.AddScoped<IHistoryFilterRuleService, HistoryFilterRuleService>();
builder.Services.AddDbContext<BrowserHistoryContext>(dbBuilder=>dbBuilder.UseNpgsql(builder.Configuration.GetConnectionString("pgsql")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors("default");
app.UseAuthorization();

app.MapControllers();
app.UseResponseCompression();
app.UseSpaStatic(Path.Join("./wwwroot","index.html"));
//
// app.UseStaticFiles(new StaticFileOptions
// {
//     OnPrepareResponse = ctx =>
//     {
//         Console.WriteLine(ctx.Context.Response.Headers[HeaderNames.ContentType]);
//         // if()
//         // const int durationInSeconds = 60 * 60 * 24;
//         // ctx.Context.Response.Headers[HeaderNames.CacheControl] =
//         //     "public,max-age=" + durationInSeconds;
//     }
// });



app.Run(); 