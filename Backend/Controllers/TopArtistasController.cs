using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TopArtistasController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public TopArtistasController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{id}", Name = "TopArtistas")]
        public async Task<IActionResult> Get(string id, string tiempo)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var token = Request.Headers["X-Access-Token"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var url = $"https://api.spotify.com/v1/me/top/artists?time_range={tiempo}&limit=51";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}

