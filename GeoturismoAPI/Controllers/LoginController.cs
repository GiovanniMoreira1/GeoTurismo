using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.Repositories;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GeoturismoAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioInterface _usuarioRepository;

        public LoginController(IUsuarioInterface context)
        {
            _usuarioRepository = context;
        }

        /// <summary>
        /// Metodo responsavel por fazer login no sistema
        /// </summary>
        /// <param name="login">Objeto do tipo Login com Email e Senha</param>
        /// <returns>Usuario com esse email e senha</returns>
        [HttpPost]
        public IActionResult Login(loginViewModel infoLogin)
        {
            try
            {
                usuario UsuarioBuscado = _usuarioRepository.Login(infoLogin);

                if (UsuarioBuscado != null)
                {
                    var MinhasClains = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Email, UsuarioBuscado.email),
                        new Claim(JwtRegisteredClaimNames.Jti, UsuarioBuscado.id_usuarios.ToString())
                    };

                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("projetogeoturismo-chave-autenticacao"));

                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var meuToken = new JwtSecurityToken(
                        issuer: "ProjetoGeoturismo_webAPI",
                        audience: "ProjetoGeoturismo_webAPI",
                        claims: MinhasClains,
                        expires: DateTime.Now.AddHours(3),
                        signingCredentials: creds
                        );

                    return Created("uri", new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                    });
                }

                return BadRequest("Email ou Senha Invalidos!");
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Erro ao tentar autenticar", erro = ex.Message });
            }
        }
    }
}
