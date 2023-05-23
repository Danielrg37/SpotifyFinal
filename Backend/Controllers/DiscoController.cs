using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiscoController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public DiscoController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{id}", Name = "Disco")]
        public async Task<IActionResult> Get(string id)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var token = Request.Headers["X-Access-Token"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            // Retrieve album details
            var albumUrl = $"https://api.spotify.com/v1/albums/{id}?si=c14fd7cce6ec4d59";
            var albumResponse = await httpClient.GetAsync(albumUrl);
            var albumContent = await albumResponse.Content.ReadAsStringAsync();

            // Retrieve tracks for the album
            var tracksUrl = $"https://api.spotify.com/v1/albums/{id}/tracks";
            var tracksResponse = await httpClient.GetAsync(tracksUrl);
            var tracksContent = await tracksResponse.Content.ReadAsStringAsync();

            // Create an object to hold both album details and tracks
            var result = new
            {
                Album = albumContent,
                Tracks = tracksContent
            };

            return Ok(result);
        }
    }
}
