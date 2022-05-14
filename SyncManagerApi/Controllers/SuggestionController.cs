using Microsoft.AspNetCore.Mvc;
using SyncManagerApi.Interface;
using SyncManagerApi.Models.DB;

namespace SyncManagerApi.Controllers;
[Route("api/[controller]")]
[ApiController]
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