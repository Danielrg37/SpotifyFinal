using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace Backend.Controllers
{
    [ApiController]
    [Route("descripcion")]
    public class DescripcionController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public DescripcionController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{artistName}", Name = "Descripcion")]
        public async Task<IActionResult> FetchDescripcion(string artistName)
        {
            if (!string.IsNullOrEmpty(artistName))
            {
                string url = $"https://www.last.fm/es/music/{Uri.EscapeDataString(artistName)}/+wiki?{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
                Console.WriteLine(url);

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
                    client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.9");

                    var respuesta = await client.GetAsync(url);
                    respuesta.EnsureSuccessStatusCode();

                    // Parse HTML response using HtmlAgilityPack
                    var html = await respuesta.Content.ReadAsStringAsync();
                    var doc = new HtmlDocument();
                    doc.LoadHtml(html);

                    // Get the description from the HTML
                    var descripcion = new StringBuilder();
                    var container = doc.DocumentNode.SelectSingleNode("//div[contains(@class, 'wiki-content')]");
                    if (container != null)
                    {
                        foreach (var paragraph in container.Descendants("p"))
                        {
                            descripcion.Append(paragraph.InnerText + " ");
                        }
                    }

                    // Create a JObject with the description
                    var jsonObject = new JObject();
                    jsonObject["descripcion"] = descripcion.ToString();

                    // Convert the JObject to a JSON string without escaping Unicode characters
                    var jsonString = JsonConvert.SerializeObject(jsonObject, new JsonSerializerSettings
                    {
                        StringEscapeHandling = StringEscapeHandling.EscapeHtml
                    });

                    // Return the JSON string as the response
                    return Content(jsonString, "application/json");
                }
            }

            return BadRequest();
        }
    }
}
