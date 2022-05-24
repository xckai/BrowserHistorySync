using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace SyncManagerApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : Controller
{
    private IConfiguration _configuration;
    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;

    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromForm] string? secret)
    {
        secret ??= "";
        var systemSecret = _configuration.GetValue<string>("AuthSecret") ?? "";
        if (!systemSecret.Equals(secret))
        {
            return BadRequest("Password is incorrect!");
        }
        
        var claimsIdentity = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, "user"),
            new Claim(ClaimTypes.Role, "user"),
            //...
        }, "Cookies");

        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);
        return Ok();
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var claimsIdentity = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, "normal_user"),
            new Claim(ClaimTypes.Role, "user"),
            //...
        }, "Cookies");

        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        await Request.HttpContext.SignOutAsync("Cookies");
        return Ok();
    }
}