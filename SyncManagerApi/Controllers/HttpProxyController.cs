using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace SyncManagerApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class HttpProxyController : Controller
{
    [HttpGet]
    public async Task Get(string url)
    {

        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Clear();

        foreach (var header in HttpContext.Request.Headers)
        {
            if (header.Key != "Host")
            {
                httpClient.DefaultRequestHeaders.Add(header.Key, header.Value.ToString());

            }
        }

        var response = await httpClient.GetAsync(url);
        HttpContext.Response.StatusCode = (int)response.StatusCode;

        foreach (var header in response.Headers)
        {
            HttpContext.Response.Headers.Add(header.Key, string.Join(", ", header.Value));
        }

        foreach (var header in response.Content.Headers)
        {
            if (header.Key == "Content-Length") // this will be set automatically at dispose time
                continue;

            HttpContext.Response.Headers.Add(header.Key, string.Join(", ", header.Value));
        }

        await using var stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false);
        await stream.CopyToAsync(HttpContext.Response.Body).ConfigureAwait(false);
    }
}
