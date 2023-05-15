using Microsoft.AspNetCore.Mvc;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagenesController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ImagenesController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{nombreArtista}", Name = "GetImagenes")]
        public async Task<IActionResult> Get(string nombreArtista)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();

                var url = $"https://www.last.fm/music/{Uri.EscapeUriString(nombreArtista)}/+images?{DateTime.Now.Ticks}";
                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
                request.Headers.Add("Accept-Language", "en-US,en;q=0.9");

                var response = await httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();

                var htmlContent = await response.Content.ReadAsStringAsync();

                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(htmlContent);

                var images = new List<string>();

                var imageNodes = htmlDocument.DocumentNode.SelectNodes("//div[contains(@class, 'image-list-item')]//img");
                if (imageNodes != null)
                {
                    foreach (var imageNode in imageNodes)
                    {
                        var imageUrl = imageNode.GetAttributeValue("src", string.Empty);
                        images.Add(imageUrl.Replace("avatar170s", "avatar1920s"));
                    }
                }

                return Ok(images);
            }
            catch (Exception ex)
            {
                // Handle the error appropriately
                return StatusCode(500, ex.Message);
            }
        }
    }
}
