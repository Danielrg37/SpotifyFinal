using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArtistaController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ArtistaController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{id}", Name = "Artista")]
        public async Task<IActionResult> Get(string id)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var token = Request.Headers["X-Access-Token"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var url = $"https://api.spotify.com/v1/artists/{id}";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}
