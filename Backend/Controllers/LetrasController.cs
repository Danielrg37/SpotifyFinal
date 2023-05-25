using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LetraController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public LetraController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

      [HttpGet("{cancion}", Name = "letras")]
public async Task<IActionResult> GetLetra(string cancion)
{
    string accessToken = "-ImT2ynhgjGOA_ktoe31opdJw0huxaFal8txUqK5Vjui_hgwES2ceLIlFDSNdAGP"; // Replace with your Genius API access token

    // Build the search query
    string searchQuery = $"https://api.genius.com/search?q={cancion}";

    // Create an HttpClient with headers
    using (HttpClient client = _httpClientFactory.CreateClient())
    {
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");

        // Perform the search request
        var searchResponse = await client.GetAsync(searchQuery);
        searchResponse.EnsureSuccessStatusCode();

        // Parse the search response
        var searchContent = await searchResponse.Content.ReadAsStringAsync();
        var searchData = JsonSerializer.Deserialize<GeniusSearchResponse>(searchContent);

        // Check if search data and hits are not null
        if (searchData?.Response?.Hits != null && searchData.Response.Hits.Length > 0)
        {
            // Get the first search result (assuming it's the most relevant)
            var searchResult = searchData.Response.Hits[0];

            // Get the song ID from the search result
            string songId = searchResult.Result.Id.ToString();

            // Build the lyrics query
            string lyricsQuery = $"https://api.genius.com/songs/{songId}";

            // Perform the lyrics request
            var lyricsResponse = await client.GetAsync(lyricsQuery);
            lyricsResponse.EnsureSuccessStatusCode();

            // Parse the lyrics response
            var lyricsContent = await lyricsResponse.Content.ReadAsStringAsync();
            var lyricsData = JsonSerializer.Deserialize<GeniusLyricsResponse>(lyricsContent);

            // Check if lyrics data and lyrics are not null
            if (lyricsData?.Response?.Song?.Lyrics != null)
            {
                // Get the lyrics from the response
                string lyrics = lyricsData.Response.Song.Lyrics;

                return Ok(lyrics);
            }
        }

        // Handle the case when lyrics are not found or the response structure is unexpected
        return NotFound();
    }
}

    }
    

    // Models for JSON deserialization
    public class GeniusSearchResponse
    {
        public GeniusSearchData Response { get; set; }
    }

    public class GeniusSearchData
    {
        public GeniusSearchResult[] Hits { get; set; }
    }

    public class GeniusSearchResult
    {
        public GeniusSongResult Result { get; set; }
    }

    public class GeniusSongResult
    {
        public int Id { get; set; }
    }

    public class GeniusLyricsResponse
    {
        public GeniusLyricsData Response { get; set; }
    }

    public class GeniusLyricsData
    {
        public GeniusLyrics Song { get; set; }
    }

    public class GeniusLyrics
    {
        public string Lyrics { get; set; }
    }
}
