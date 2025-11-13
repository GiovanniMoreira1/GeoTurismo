using GeoturismoAPI.Interfaces;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GeoturismoAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaInterface _categoriaRepository;

        public CategoriaController(ICategoriaInterface context)
        {
            _categoriaRepository = context;
        }

        /// <summary>
        /// Metodo responsavel pela listagem de todos as categorias
        /// </summary>
        /// <returns>Uma lista de categorias</returns>
        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                List<categoriaViewModel> listaCategorias = _categoriaRepository.ListarTodas();
                if (listaCategorias.Count == 0)
                {
                    return NoContent();
                }
                return Ok(listaCategorias);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao listar categorias", erro = ex.Message });
            }
        }
    }
}
