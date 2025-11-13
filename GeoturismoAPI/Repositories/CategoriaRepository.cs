using GeoturismoAPI.Context;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Repositories
{
    public class CategoriaRepository : ICategoriaInterface
    {
        private readonly GeoturismoContext ctx;

        public CategoriaRepository(GeoturismoContext appContext)
        {
            ctx = appContext;
        }

        public List<categoriaViewModel> ListarTodas()
        {
            return ctx.categorias
                .Select(c => new categoriaViewModel
                {
                    id_categorias = c.id_categorias,
                    nome = c.nome
                })
                .ToList();
        }
    }
}
