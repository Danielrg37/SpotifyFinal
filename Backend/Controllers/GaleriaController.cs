using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GaleriaController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public GaleriaController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{artistName}", Name = "galeria")]
        public async Task<IActionResult> FetchGaleria(string artistName)
        {
            if (!string.IsNullOrEmpty(artistName))
            {
                string url = $"https://www.last.fm/music/{Uri.EscapeDataString(artistName)}/+images?{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
                Console.WriteLine(url);

                using (HttpClient client = _httpClientFactory.CreateClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
                    client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.9");

                    var response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();

                    // Parse HTML response using HtmlAgilityPack
                    var html = await response.Content.ReadAsStringAsync();
                    var doc = new HtmlDocument();
                    doc.LoadHtml(html);

                    // Get the image URLs from the HTML
                    var images = new List<string>();
                    var imageNodes = doc.DocumentNode.SelectNodes("//div[contains(@class, 'image-list-item')]//img");
                    if (imageNodes != null)
                    {
                        foreach (var imageNode in imageNodes)
                        {
                            string imageUrl = imageNode.GetAttributeValue("src", "");
                            images.Add(imageUrl);
                        }
                    }

                    return Ok(images);
                }
            }

            return BadRequest();
        }
    }
}
