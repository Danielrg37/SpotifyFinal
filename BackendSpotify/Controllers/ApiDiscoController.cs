using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace BackendSpotify.Controllers
{
    [Route("/api/disco")]
    [ApiController]
  public class ApiDiscoController: ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ApiDiscoController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var token = Request.Headers["X-Access-Token"];
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync("https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj");
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}
