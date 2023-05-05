using Microsoft.AspNetCore.Mvc;

namespace BackendSpotify.Controllers
{
    [Route("/api/artista")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello World");
        }
    }
}
