using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DescripcionController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public DescripcionController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{artistaName}", Name = "Descripcion")]
        public async Task<IActionResult> Get(string artistaName)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
                httpClient.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.9");

                var url = $"https://www.last.fm/es/music/{Uri.EscapeDataString(artistaName)}/+wiki?{DateTime.UtcNow.Ticks}";
                var response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var html = await response.Content.ReadAsStringAsync();
                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                var descriptions = "";
                var container = doc.DocumentNode.SelectSingleNode("//div[contains(@class, 'wiki-content')]");
                if (container != null)
                {
                    var paragraphs = container.SelectNodes(".//p");
                    if (paragraphs != null)
                    {
                        var count = 0;
                        foreach (var paragraph in paragraphs)
                        {
                            descriptions += paragraph.InnerText.Trim() + " ";
                            count++;
                            if (count >= 3) // Cortar en el tercer párrafo
                                break;
                        }
                    }
                }

                return Ok(descriptions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
