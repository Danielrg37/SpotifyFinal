using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

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

        [HttpGet("{nombre}", Name = "Eventos")]
        public async Task<IActionResult> Get(string nombre)
        {
            var httpClient = _httpClientFactory.CreateClient();

            var url = $"https://www.last.fm/music/{Uri.EscapeDataString(nombre)}/+events";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            var events = new List<LastFmEvent>();

            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(content);

            var eventNodes = htmlDocument.DocumentNode.SelectNodes("//li[contains(@class, 'events-list-item')]");

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
        public string Title { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
    }
}
