using System.Net.Mime;
using Microsoft.Net.Http.Headers;

namespace SyncMangerApi.Extensions;

public static class SpaStaticServerMiddleware
{
    public static void UseSpaStatic(this WebApplication app, string defaultIndexHtmlPath)
    {
        app.UseStaticFiles(new StaticFileOptions()
        {
            OnPrepareResponse = ctx =>
            {
                var mimeList = new List<string>() { "application/javascript", "image/png","image/svg+xml", "image/x-icon"};
                Console.WriteLine(ctx.Context.Response.Headers[HeaderNames.ContentType]);
                if (mimeList.Contains(ctx.Context.Response.Headers[HeaderNames.ContentType]))
                {
                    const int durationInSeconds = 60 * 60 * 24 * 30;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            }
        });
        app.MapWhen(ctx => !ctx.Request.Path.StartsWithSegments("/api"), builder =>
        {
            builder.Run(async (context) =>
            {
                var etag = context.Request.Headers.IfNoneMatch;
                var lastModifyDate = File.GetLastWriteTime(defaultIndexHtmlPath).ToFileTime().ToString();
                if (etag == lastModifyDate)
                {
                    context.Response.StatusCode = 304;
                }
                else
                {
                    context.Response.ContentType = "text/html;charset=utf-8";
                    context.Response.Headers.ETag = lastModifyDate;
                    await context.Response.SendFileAsync(defaultIndexHtmlPath);
                }
              
                
            });
        });
    }
}