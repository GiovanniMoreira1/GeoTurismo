using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface ILocaisInterface
    {
        /// <summary>
        /// Metodo responsavel por cadastrar novos locais
        /// </summary>
        /// <param name="localNovo">Infos do novo local</param>
        void CriarLocal(LocalCreateDTO localNovo, Guid id_usuarios);

        /// <summary>
        /// Listar todos os locais
        /// </summary>
        /// <returns>Uma lista de locais</returns>
        List<locaisViewModel> ListarLocais();

        /// <summary>
        /// Metodo responsavel por buscar um local especifico pelo ID
        /// </summary>
        /// <param name="id">Id a ser buscado</param>
        /// <returns>Um local especifico</returns>
        LocalResponseDTO BuscarId(Guid id);
    }
}
