using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface IUsuarioInterface
    {
        /// <summary>
        /// Metodo responsavel pelo login do usuario
        /// </summary>
        /// <param name="email">Email inserido pelo usuario para comparacao</param>
        /// <param name="senha">Senha inserida pelo usuario para comparção</param>
        /// <returns>Retorna um usuario caso os valores recebidos sejam semelhantes aos do banco de dados.</returns>
        usuario Login(string email, string senha);
        
        /// <summary>
        /// Método de cadastro de usuario
        /// </summary>
        /// <param name="usuarionovo">Novo objeto do tipo usuario para cadastro</param>
        void Cadastrar(usuarioViewModel usuarionovo);

        /// <summary>
        /// Metodo responsavel por buscar um ususario especifico pelo ID
        /// </summary>
        /// <param name="id">Id a ser buscado</param>
        /// <returns>Um usuario especifico</returns>
        usuario BuscarId(Guid id);
    }
}
