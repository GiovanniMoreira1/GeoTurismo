using GeoturismoAPI.Context;
using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.ViewModels;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace GeoturismoAPI.Repositories
{
    public class LocaisRepository : ILocaisInterface
    {
        private readonly GeoturismoContext ctx;

        public LocaisRepository(GeoturismoContext appContext)
        {
            ctx = appContext;
        }

        public LocalResponseDTO BuscarId(Guid id)
        {
            var local = ctx.locais
            .Where(l => l.id_locais == id)
            .Select(l => new LocalResponseDTO()
            {
                id_locais = l.id_locais,
                nome = l.nome,
                descricao = l.descricao,
                media_avaliacao = l.media_avaliacao,
                categorias = l.filtros
                .Select(f => f.categorias.nome)
                .ToList()
            })
            .FirstOrDefault();

            return local;
        }


        public void CriarLocal(LocalCreateDTO localNovo, Guid id_usuarios)
        {
            var local = new locai 
            { 
                usuarios_id = id_usuarios,
                nome = localNovo.nome,
                descricao = localNovo.descricao,
                endereco = localNovo.endereco,
                localizacao = new Point(localNovo.Latitude, localNovo.Longitude) { SRID = 4326 },
                //filtros = localNovo.filtros.Select(f => new filtro { categorias_id = f.categorias_id }).ToList()
            };

            ctx.locais.Add(local);

            ctx.SaveChanges();
        }

        public List<locaisViewModel> ListarLocais()
        {
            List<locai> listaLocais = ctx.locais
                .Select(l => new locai()
                {
                    id_locais = l.id_locais,
                    nome = l.nome,
                    localizacao = l.localizacao
                }
                ).ToList();

            List<locaisViewModel> locaisTratados = new List<locaisViewModel>();

            foreach (var item in listaLocais)
            {
                locaisViewModel local = new locaisViewModel{
                    id_locais = item.id_locais,
                    nome = item.nome,
                    Latitude = item.localizacao.X,
                    Longitude = item.localizacao.Y
                };

                locaisTratados.Add(local);
            }

            return locaisTratados;
        }

    }
}
