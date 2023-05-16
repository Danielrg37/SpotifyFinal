using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HistorialRController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HistorialRController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{id}", Name = "Historialr")]
        public async Task<IActionResult> Get(string id)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var token = Request.Headers["X-Access-Token"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var url = $"https://api.spotify.com/v1/me/player/recently-played?limit=50";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}
