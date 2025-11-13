using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.Repositories;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System.Globalization;

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

                if (id_usuarios == Guid.Empty)
                    return Unauthorized("Token inválido ou expirado.");

                _locaisRepository.CriarLocal(localnovo, id_usuarios);

                return StatusCode(201);

            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao criar um novo local", erro = ex.Message });
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
                List<locaisViewModel> listaLocais = _locaisRepository.ListarLocais();
                if (listaLocais.Count == 0)
                {
                    return NoContent();
                }
                return Ok(_locaisRepository.ListarLocais());
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao buscar os locais", erro = ex.Message });
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
                LocalResponseDTO local = _locaisRepository.BuscarId(id);

                if (local == null)
                {
                    return NotFound();
                }

                return Ok(local);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = String.Concat("Erro ao buscar o local ", id), erro = ex.Message });
            }
        }

        /// <summary>
        /// Metodo responsavel por Listar pontos proximos a uma localizacao
        /// </summary>
        /// <returns>locais proximos ordenados</returns>
        [Authorize]
        [HttpPost("/api/Locais/proximidade")]
        public IActionResult Listar_Pontos_Proximos([FromBody] LocaisProximosRequestDTO request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(_locaisRepository.ListarLocaisProximos(request.Latitude, request.Longitude, request.Metros));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = String.Concat("Erro ao locais pela localizacao do usuario"), erro = ex.Message });
            }
        }

        /// <summary>
        /// Metodo responsavel por deletar um local
        /// </summary>
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Deletar(Guid id)
        {
            try
            {
                Guid id_usuarios = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (id_usuarios == Guid.Empty)
                    return Unauthorized("Token inválido ou expirado.");

                _locaisRepository.DeletarLocal(id, id_usuarios);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = String.Concat("Erro ao deletar o local ", id), erro = ex.Message });
            }
        }

        /// <summary>
        /// Listar todos os locais do usuario
        /// </summary>
        /// <returns>Uma lista dos meus locais</returns>
        [Authorize]
        [HttpGet("meuslocais")]
        public IActionResult Listar_Meus_locais()
        {
            try
            {
                Guid id_usuarios = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (id_usuarios == Guid.Empty)
                    return Unauthorized("Token inválido ou expirado.");

                return Ok(_locaisRepository.ListarMeusLocais(id_usuarios));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = String.Concat("Erro ao listar locais do usuario"), erro = ex.Message });
            }
        }

    }
}
