using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
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
    options.AddPolicy("default", policyBuilder =>
    {
        policyBuilder.AllowCredentials().AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowedToAllowWildcardSubdomains().WithOrigins("http://localhost:9000")
            .WithOrigins("http://*.local.me:9000");
    });
});
builder.Services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
// Cookie Settings
builder.Services.AddAuthentication(options=>options.DefaultScheme ="Cookies")
    .AddCookie("Cookies", options =>
    {
        options.Cookie.Name = "browser_history_sync_manager_auth";
        options.ExpireTimeSpan = TimeSpan.FromDays(3);
        options.Cookie.MaxAge = TimeSpan.FromDays(3);
        options.SlidingExpiration = true;
        options.Events = new CookieAuthenticationEvents
        {                          
            OnRedirectToLogin = redirectContext =>
            {
                var errorMsg =Encoding.UTF8.GetBytes("Authentication failed");
                redirectContext.HttpContext.Response.StatusCode = 401;
                redirectContext.HttpContext.Response.Headers.ContentType = "text/plain; charset=utf-8";
                return redirectContext.HttpContext.Response.Body.WriteAsync(errorMsg, 0, errorMsg.Length);
            }
        };
    });

// private DI
builder.Services.AddScoped<IBrowserHistoryService,BrowserHistoryService>();
builder.Services.AddScoped<IHistoryFilterRuleService, HistoryFilterRuleService>();
builder.Services.AddScoped<ISuggestionService, SuggestionService>();


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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseResponseCompression();
app.UseSpaStatic(Path.Join("./wwwroot","index.html"));



app.Run(); 