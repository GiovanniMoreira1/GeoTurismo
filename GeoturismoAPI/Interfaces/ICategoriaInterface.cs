using GeoturismoAPI.Domains;

namespace GeoturismoAPI.Interfaces
{
    public interface ICategoriaInterface
    {
        /// <summary>
        /// Retorna todas as categorias criadas
        /// </summary>
        /// <returns>Lista de categorias</returns>
        List<categoria> ListarTodas();
    }
}
