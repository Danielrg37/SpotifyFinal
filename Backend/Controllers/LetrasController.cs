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

       [HttpGet("{cancion}/{artista}", Name = "letras")]
public async Task<IActionResult> GetLetra(string cancion, object artista)
{
    string accessToken = "1GT5ShgPRGEQmrGnR0Pd0uL4K1fiaytQusPvhKH9NfLo6MdWuzNI-9E_eZhZ4Djp"; // Replace with your Genius API access token

    var httpClient = _httpClientFactory.CreateClient();

    var searchUrl = $"https://api.genius.com/search?q={cancion} {artista}";
    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

    var searchResponse = await httpClient.GetAsync(searchUrl);
    var searchContent = await searchResponse.Content.ReadAsStringAsync();
    var searchResult = JsonSerializer.Deserialize<GeniusSearchResult>(searchContent);

    if (searchResult.response.hits.Length == 0)
    {
        return NotFound("No matching songs found.");
    }

    var songId = searchResult.response.hits[0].result.id;

    var songUrl = $"https://api.genius.com/songs/{songId}?text_format=plain";
    var songResponse = await httpClient.GetAsync(songUrl);
    var songContent = await songResponse.Content.ReadAsStringAsync();
    var songResult = JsonSerializer.Deserialize<GeniusSongResult>(songContent);
    var songLyrics = songResult.response.song.description;

    return Ok(songLyrics);
}

    
    }

    public class GeniusSearchResult
    {
        public GeniusResponse response { get; set; }
    }

    public class GeniusResponse
    {
        public GeniusHit[] hits { get; set; }
    }

    public class GeniusHit
    {
        public GeniusResult result { get; set; }
    }

  public class GeniusResult
{
    public int id { get; set; }
}


    public class GeniusSongResult
    {
        public SongData response { get; set; }
    }

    public class SongData
    {
        public SongResult song { get; set; }
    }

    public class SongResult
    {
        public string description { get; set; }
    }
}
