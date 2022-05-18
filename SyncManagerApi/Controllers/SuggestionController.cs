using Microsoft.AspNetCore.Mvc;
using SyncManagerApi.Interface;
using SyncManagerApi.Models.DB;
using Microsoft.AspNetCore.Authorization;
namespace SyncManagerApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SuggestionController : Controller
{
    private readonly ISuggestionService _suggestionService;

    public SuggestionController(ISuggestionService suggestionService)
    {
        this._suggestionService = suggestionService;
    }
    // GET
    [HttpGet]
    public async Task<IList<BrowserHistory>> Query(string keyword, int maxSize = 10)
    {
        return await this._suggestionService.Query(keyword, maxSize);
    }

}