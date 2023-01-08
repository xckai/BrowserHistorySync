using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Extensions;

public static  class WebApplicationBuilderExtension
{
    public static void UseCookieAuth(this WebApplicationBuilder builder)
    {
        
        builder.Services.AddAuthentication(options => options.DefaultScheme = "Cookies")
            .AddCookie("Cookies", options =>
            {
                options.Cookie.Name = "browser_history_sync_manager_auth";
                options.ExpireTimeSpan = TimeSpan.FromDays(30);
                options.Cookie.MaxAge = TimeSpan.FromDays(30);
                options.SlidingExpiration = true;
                options.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = redirectContext =>
                    {
                        var errorMsg = Encoding.UTF8.GetBytes("Authentication failed");
                        redirectContext.HttpContext.Response.StatusCode = 401;
                        redirectContext.HttpContext.Response.Headers.ContentType = "text/plain; charset=utf-8";
                        return redirectContext.HttpContext.Response.Body.WriteAsync(errorMsg, 0, errorMsg.Length);
                    }
                };
            });

    }
    public static void ConfigDbContext(this WebApplicationBuilder builder)
    {
        var dbType = (builder.Configuration.GetValue<string>("DBType") ?? "").ToLower();
        var dbConnectionStr = builder.Configuration.GetValue<string>("DBConnectionStr");
        if (dbType == "postgresql")
            builder.Services.AddDbContext<BrowserHistoryContext>(dbBuilder => dbBuilder.UseNpgsql(dbConnectionStr));
        else if (dbType == "sqlite")
            builder.Services.AddDbContext<BrowserHistoryContext>(dbBuilder => dbBuilder.UseSqlite(dbConnectionStr));
        else if (dbType == "mysql")
            builder.Services.AddDbContext<BrowserHistoryContext>(dbBuilder => dbBuilder.UseMySql(dbConnectionStr,ServerVersion.AutoDetect(dbConnectionStr)));
        else if (dbType == "mariadb")
            builder.Services.AddDbContext<BrowserHistoryContext>(dbBuilder => dbBuilder.UseMySql(dbConnectionStr,MariaDbServerVersion.AutoDetect(dbConnectionStr)));
        else
            throw new Exception("Unsupported DB type: " + dbType);
        
    }
}