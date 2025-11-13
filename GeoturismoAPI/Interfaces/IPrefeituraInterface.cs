using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface IPrefeituraInterface
    {
        /// <summary>
        /// Metodo responsavel por cadastrar uma nova prefeitura
        /// </summary>
        /// <param name="novaPrefeitura">Informacoes da nova prefeitura</param>
        void CadastrarPrefeitura(prefeituraViewModel novaPrefeitura);

        /// <summary>
        /// Metodo responsavel por buscar uma prefeitura especifica pelo ID
        /// </summary>
        /// <param name="id">Id a ser buscado</param>
        /// <returns>Uma prefeitura especifica</returns>
        usuario BuscarId(Guid id);
    }
}
