using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LetrasController : ControllerBase
    {
        private readonly string _geniusApiToken = "-ImT2ynhgjGOA_ktoe31opdJw0huxaFal8txUqK5Vjui_hgwES2ceLIlFDSNdAGP";

        [HttpGet("{songName}/{artistName}", Name = "Letras")]
        public async Task<IActionResult> Get(string songName, string artistName)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _geniusApiToken);

            var searchUrl = $"https://api.genius.com/search?q={Uri.EscapeDataString(songName)} {Uri.EscapeDataString(artistName)}";
            var searchResponse = await httpClient.GetAsync(searchUrl);
            var searchContent = await searchResponse.Content.ReadAsStringAsync();

            var songUrl = ObtenerUrlLetraCancionDesdeRespuestaBusqueda(searchContent, songName, artistName);

            if (!string.IsNullOrEmpty(songUrl))
            {
                var lyricsUrl = $"{songUrl}/lyrics";
                var lyricsResponse = await httpClient.GetAsync(lyricsUrl);
                var lyricsContent = await lyricsResponse.Content.ReadAsStringAsync();

                dynamic lyricsJson = Newtonsoft.Json.JsonConvert.DeserializeObject(lyricsContent);
                var lyrics = lyricsJson.response.lyrics.body.ToString();

                return Ok(lyrics);
            }
            else
            {
                return NotFound();
            }
        }

  private string ObtenerUrlLetraCancionDesdeRespuestaBusqueda(string searchResponse, string songName, string artistName)
{
    dynamic jsonResponse = Newtonsoft.Json.JsonConvert.DeserializeObject(searchResponse);
    var hits = jsonResponse.response.hits;

    foreach (var hit in hits)
    {
        var result = hit.result;
        var resultSongName = result.title.ToString();
        var resultArtistName = result.primary_artist.name.ToString();

        if (IsMatch(songName, resultSongName) && IsMatch(artistName, resultArtistName))
        {
            var songUrl = result.url.ToString();
            return songUrl;
        }
    }

    return null;
}

private bool IsMatch(string input1, string input2)
{
    // You can implement a more advanced matching logic here if needed
    return string.Equals(input1, input2, StringComparison.OrdinalIgnoreCase);
}

    }
}