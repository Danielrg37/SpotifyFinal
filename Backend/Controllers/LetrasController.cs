using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LetrasController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public LetrasController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

       [HttpGet("{cancion}-{artista}", Name = "letras")]
public async Task<IActionResult> GetLetra(string cancion, string artista)
{


    string accessToken = "1GT5ShgPRGEQmrGnR0Pd0uL4K1fiaytQusPvhKH9NfLo6MdWuzNI-9E_eZhZ4Djp"; // Replace with your Genius API access token

    var client = _httpClientFactory.CreateClient();
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.genius.com/search?q={cancion}-{artista}");
    var response = await client.SendAsync(request);
    if (response.IsSuccessStatusCode)
    {
        using var responseStream = await response.Content.ReadAsStreamAsync();
        var result = await JsonSerializer.DeserializeAsync<GeniusResponse>(responseStream);
        return Ok(result);
    }
    else
    {
        return NotFound();
    }
}

      public class GeniusResponse
{
    public GeniusMeta meta { get; set; }
    public GeniusSearchResult response { get; set; }
}

public class GeniusMeta
{
    public int status { get; set; }
}

public class GeniusSearchResult
{
    public List<GeniusHit> hits { get; set; }
}

public class GeniusHit
{
    public GeniusResult result { get; set; }
}

public class GeniusResult
{
    public int id { get; set; }
    public string title { get; set; }
    // Agrega más propiedades según la estructura de la respuesta de la API de Genius
}

    }


  

}
    