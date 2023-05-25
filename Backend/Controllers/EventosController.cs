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
    public class EventosController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public EventosController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{artistName}", Name = "eventos")]
        public async Task<IActionResult> FetchEventos(string artistName)
        {
            if (!string.IsNullOrEmpty(artistName))
            {
                string url = $"https://www.last.fm/music/{Uri.EscapeDataString(artistName)}/+events?{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
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

// Get the events from the HTML
var eventos = new List<string>();
var eventoNodes = doc.DocumentNode.SelectNodes("//li[contains(@class, 'events-list-item')]/div[2]//a");
if (eventoNodes != null)
{
    foreach (var eventoNode in eventoNodes)
    {
        string eventoNombre = eventoNode.InnerText;
        eventos.Add(eventoNombre);
    }
}

return Ok(eventos);

                }
            }

            return BadRequest();
        }
    }
}
