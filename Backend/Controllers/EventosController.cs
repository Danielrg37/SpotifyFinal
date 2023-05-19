using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

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

        [HttpGet("{Nombre}", Name = "Eventos")]
        public async Task<IActionResult> Get(string Nombre)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var token = Request.Headers["X-Access-Token"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var url = $"https://www.last.fm/music/{Uri.EscapeDataString(Nombre)}/+events";
            var web = new HtmlWeb();
            var doc = await web.LoadFromWebAsync(url);

            var events = new List<LastFmEvent>();

            var eventNodes = doc.DocumentNode.SelectNodes("//li[contains(@class, 'events-list-item')]");

            if (eventNodes != null)
            {
                foreach (var eventNode in eventNodes)
                {
                    var titleNode = eventNode.SelectSingleNode(".//h4[@class='events-list-item-title']/a");
                    var locationNode = eventNode.SelectSingleNode(".//span[@class='events-list-item-location']");
                    var dateNode = eventNode.SelectSingleNode(".//time[@class='events-list-item-date']");

                    if (titleNode != null && locationNode != null && dateNode != null)
                    {
                        var title = titleNode.InnerText.Trim();
                        var location = locationNode.InnerText.Trim();
                        var dateString = dateNode.GetAttributeValue("datetime", "");
                        DateTime date;

                        if (!string.IsNullOrEmpty(dateString) && DateTime.TryParse(dateString, out date))
                        {
                            events.Add(new LastFmEvent
                            {
                                Title = title,
                                Location = location,
                                Date = date
                            });
                        }
                    }
                }
            }

            return Ok(events);
        }
    }

    internal class LastFmEvent
    {
        public string? Title { get; set; }
        public string? Location { get; set; }
        public DateTime Date { get; set; }
    }
}
