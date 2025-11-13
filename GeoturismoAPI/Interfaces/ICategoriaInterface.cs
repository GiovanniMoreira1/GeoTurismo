using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface ICategoriaInterface
    {
        /// <summary>
        /// Retorna todas as categorias criadas
        /// </summary>
        /// <returns>Lista de categorias</returns>
        List<categoriaViewModel> ListarTodas();
    }
}
