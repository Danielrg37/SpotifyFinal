using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
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

      
       [HttpGet("{artistName}", Name = "Eventos")]
        public async Task<IActionResult> FetchEventos(string artistName)
        {
            var eventos = new List<string>();
            if (!string.IsNullOrEmpty(artistName))
            {
                string url = $"https://www.last.fm/es/music/{Uri.EscapeDataString(artistName)}/+events?{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
                Console.WriteLine(url);

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
                    client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.9");

                    var response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();

                    // Parse HTML response using HtmlAgilityPack
                    var html = await response.Content.ReadAsStringAsync();
                    var doc = new HtmlDocument();
                    doc.LoadHtml(html);

           var tableNode = doc.DocumentNode.SelectSingleNode("//table[@class='events-list']");
            if (tableNode != null)
            {
                // Process the table rows and cells
                var rows = tableNode.SelectNodes(".//tr");
                if (rows != null)
                {
                    foreach (var row in rows)
                    {
                        var cells = row.SelectNodes(".//td");
                        if (cells != null)
                        {
                            var rowData = new List<string>();
                            foreach (var cell in cells)
                            {
                                rowData.Add(cell.InnerText.Trim());
                            }
                            eventos.Add(string.Join(", ", rowData));
                        }
                    }
                }
            }
                }
              
          
}

  return Ok(eventos);
        }
    }
}
