using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace BackendSpotify.Controllers
{
    [Route("/api/usuario")]
    [ApiController]
  public class ApiObtenerUsuario: ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ApiObtenerUsuario(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
           
            var response = await _httpClient.GetAsync("https://api.spotify.com/v1/me");
            var content = await response.Content.ReadAsStringAsync();

            return Ok(content);
        }
    }
}
