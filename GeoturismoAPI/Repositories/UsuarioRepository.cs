using GeoturismoAPI.Context;
using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.Utils;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Repositories
{
    public class UsuarioRepository : IUsuarioInterface
    {
        private readonly GeoturismoContext ctx;

        public UsuarioRepository(GeoturismoContext appContext)
        {
            ctx = appContext;
        }

        public usuario BuscarId(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(usuarioViewModel usuarionovo)
        {
            usuario NovoUsuario = new usuario();

            NovoUsuario.nome = usuarionovo.nome;
            NovoUsuario.email = usuarionovo.email;
            NovoUsuario.senha = usuarionovo.senha;

            ctx.usuarios.Add(NovoUsuario);

            ctx.SaveChanges();
        }

        public List<locai> ListarPontosProxixmos(double Latitude, double Longitude, int metros = 1000)
        {
            throw new NotImplementedException();
        }

        public usuario Login(string email, string senha)
        {
            var usuario = ctx.usuarios.FirstOrDefault(u => u.email == email);

            if (usuario != null)
            {
                if (usuario.senha.Length < 32)
                {
                    usuario.senha = Crypto.Gerar_Hash(usuario.senha);
                    ctx.usuarios.Update(usuario);
                    ctx.SaveChanges();
                }

                bool comparado = Crypto.Comparar(senha, usuario.senha);

                if (comparado == true)
                {
                    return usuario;
                }
            }

            return null;
        }
    }
}
