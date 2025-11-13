using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace GeoturismoAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LocaisController : ControllerBase
    {
        private readonly ILocaisInterface _locaisRepository; //E declarado um IBicicletarioRepository

        public LocaisController(ILocaisInterface locais)
        //O controller vai ser instanciado com uma Interface juntando os dados de uma Interface com a outra atribuindo os valores
        {
            _locaisRepository = locais;
        }

        /// <summary>
        /// Metodo responsave pelo cadastro de novos locais
        /// </summary>
        /// <param name="localnovo">Novo local a ser cadastrado</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public IActionResult Cadastrar(LocalCreateDTO localnovo)
        {
            try
            {
                Guid id_usuarios = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                Console.WriteLine(id_usuarios);

                if (id_usuarios == Guid.Empty)
                    return Unauthorized("Token inválido ou expirado.");

                _locaisRepository.CriarLocal(localnovo, id_usuarios);

                return StatusCode(201);

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Metodo responsavel pela listagem de todos os locais
        /// </summary>
        /// <returns>Uma lista de locais</returns>
        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_locaisRepository.ListarLocais());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Metodo responsavel por buscar um local por id
        /// </summary>
        /// <param name="id">Id do local buscado</param>
        /// <returns>Um local com um id igual ao enviado</returns>
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Buscar(Guid id)
        {
            try
            {
                return Ok(_locaisRepository.BuscarId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
