using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace Backend.Controllers
{
    [ApiController]
    [Route("galeria")]
    public class GaleriaController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public GaleriaController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{artistName}")]
        public async Task<IActionResult> GetImages(string artistName)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();

                var url = $"https://www.last.fm/music/{Uri.EscapeDataString(artistName)}/+images";
                Console.WriteLine(url);

                httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
                httpClient.DefaultRequestHeaders.AcceptLanguage.ParseAdd("en-US,en;q=0.9");

                var response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var html = await response.Content.ReadAsStringAsync();
                var document = new HtmlDocument();
                document.LoadHtml(html);

                var images = new List<string>();
                var imageNodes = document.DocumentNode.SelectNodes(".//img[contains(@class, 'image-list-item__img')]");
                if (imageNodes != null)
                {
                    foreach (var imageNode in imageNodes)
                    {
                        var imageUrl = imageNode.GetAttributeValue("src", "");
                        images.Add(imageUrl.Replace("avatar170s", "avatar1920s"));
                    }
                }

                return Ok(images);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
