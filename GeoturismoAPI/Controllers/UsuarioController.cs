using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.Repositories;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
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

                return BadRequest(new { mensagem = "Erro ao tentar fazer cadastro", erro = ex.Message });
            }
        }

        /// <summary>
        /// Metodo responsavel por buscar um usuario por id
        /// </summary>
        /// <param name="id">Id do usuario buscado</param>
        /// <returns>Um usuario com um id igual ao enviado</returns>
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Buscar(Guid id)
        {
            try
            {
                usuario local = _context.BuscarId(id);

                if (local == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = String.Concat("Erro ao buscar o usuario ", id), erro = ex.Message });
            }
        }
    }
}
