using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace BackendSpotify.Controllers
{
    [Route("/api/artista")]
    [ApiController]
  public class ApiArtistaController: ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ApiArtistaController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var token = Request.Headers["X-Access-Token"];
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync("https://api.spotify.com/v1/artists/7MhMgCo0Bl0Kukl93PZbYS");
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}
