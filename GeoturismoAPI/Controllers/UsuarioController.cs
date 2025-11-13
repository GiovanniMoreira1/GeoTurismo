using GeoturismoAPI.Interfaces;
using GeoturismoAPI.Repositories;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GeoturismoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioInterface _context;

        public UsuarioController(IUsuarioInterface context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Cadastrar(usuarioViewModel usuarionovo)
        {
            try
            {
                _context.Cadastrar(usuarionovo);

                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
