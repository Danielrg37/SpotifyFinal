using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Genius.Models;
using HtmlAgilityPack;

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
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.genius.com/search?q={cancion}-{artista}&access_token={accessToken}");
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                var result = await JsonSerializer.DeserializeAsync<GeniusResponse>(responseStream);
                if (result.response.hits.Count > 0)
                {
                    var songId = result.response.hits[0].result.id;
                    var lyrics = await FetchLyricsAsync(songId);
                    if (!string.IsNullOrEmpty(lyrics))
                    {
                        return Ok(lyrics);
                    }
                }
            }

            return NotFound();
        }

      private async Task<string> FetchLyricsAsync(int songId)
{
    var geniusUrl = $"https://genius.com/songs/{songId}";
    var httpClient = _httpClientFactory.CreateClient();
    var response = await httpClient.GetAsync(geniusUrl);
    response.EnsureSuccessStatusCode();

    var html = await response.Content.ReadAsStringAsync();
    var doc = new HtmlDocument();
    doc.LoadHtml(html);

  var lyricsNodes = doc.DocumentNode.SelectNodes("//div[contains(@class, 'Lyrics__Container-sc-1ynbvzw-5')]");
    if (lyricsNodes != null)
    {
 var lyrics = string.Join("\n\n", lyricsNodes.Select(node => string.Join("\n", node.DescendantsAndSelf().Where(n => n.NodeType == HtmlNodeType.Text).Select(n => n.InnerText.Trim()))));
return lyrics;


    }

    return null;
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
            // Add more properties according to the Genius API response structure
        }
    }
}
