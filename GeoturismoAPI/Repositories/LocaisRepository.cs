using GeoturismoAPI.Context;
using GeoturismoAPI.Domains;
using GeoturismoAPI.Interfaces;
using GeoturismoAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System.Globalization;
using GeoturismoAPI.Utils;

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
                locaisViewModel local = new locaisViewModel
                {
                    id_locais = item.id_locais,
                    nome = item.nome,
                    Latitude = item.localizacao.Y,
                    Longitude = item.localizacao.X
                };

                locaisTratados.Add(local);
            }

            return locaisTratados;
        }

        public void CriarLocal(LocalCreateDTO localNovo, Guid id_usuarios)
        {
            // Verifica duplicidade por nome em um raio de 100 metros
            var locaisProximos = ListarPontosProxixmos(localNovo.Latitude, localNovo.Longitude, 100);

            bool existeDuplicado = locaisProximos
                .Any(l => string.Equals(l.nome.Trim(), localNovo.nome.Trim(), StringComparison.OrdinalIgnoreCase));

            if (existeDuplicado)
            {
                throw new InvalidOperationException($"Já existe um local com o nome '{localNovo.nome}' em um raio de 100 metros.");
            }
            else
            {
                // Criação do novo local
                var local = new locai
                {
                    usuarios_id = id_usuarios,
                    nome = localNovo.nome,
                    descricao = localNovo.descricao,
                    endereco = localNovo.endereco,
                    localizacao = new Point(localNovo.Longitude, localNovo.Latitude) { SRID = 4326 },
                    filtros = localNovo.filtros.Select(f => new filtro { categorias_id = f.categorias_id }).ToList()
                };

                ctx.locais.Add(local);
                ctx.SaveChanges();
            }
        }

        public List<locai> ListarPontosProxixmos(double Latitude, double Longitude, int metros = 100)
        {
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            var myLocation = geometryFactory.CreatePoint(new Coordinate(Longitude, Latitude));

            List<locai> locais = ctx.locais.ToList();

            return locais.OrderBy(x => x.localizacao.Distance(myLocation)).Where(x => x.localizacao.IsWithinDistance(myLocation, metros)).ToList();

        }

        public IOrderedEnumerable<LocaisProximosResponseDTO> ListarLocaisProximos(double Latitude, double Longitude, int metros=100)
        {
            var locais = ListarPontosProxixmos(Latitude, Longitude, metros);

            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

            var currentLocation = geometryFactory.CreatePoint(new Coordinate(Longitude, Latitude));

            IOrderedEnumerable<LocaisProximosResponseDTO> locaisOrdenadosDistancia = locais.ToList().Select(local => new LocaisProximosResponseDTO()
            {
                id_local = local.id_locais,
                nome = local.nome,
                endereco = local.endereco,
                latitude = Convert.ToDouble(local.localizacao.Y, CultureInfo.InvariantCulture),
                longitude = Convert.ToDouble(local.localizacao.X, CultureInfo.InvariantCulture),
                distancia = Distancia.GreatCircleDistance(
                    Convert.ToDouble(local.localizacao.Y, CultureInfo.InvariantCulture), // latitude
                    Convert.ToDouble(local.localizacao.X, CultureInfo.InvariantCulture), // longitude
                    Latitude,
                    Longitude),
            }).OrderBy(x => x.distancia);

            return locaisOrdenadosDistancia;
        }

        public void DeletarLocal(Guid idlocal, Guid idUsuario)
        {
            var local = ctx.locais
            .Where(l => l.id_locais == idlocal && l.usuarios_id == idUsuario)
            .FirstOrDefault();

            if (local == null)
                throw new Exception("Local não encontrado ou não pertence ao usuário.");

            ctx.locais.Remove(local);

            ctx.SaveChanges();
        }

        public List<locaisViewModel> ListarMeusLocais(Guid id)
        {
            List<locai> listaLocais = ctx.locais
               .Where(l => l.usuarios_id == id)
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
                locaisViewModel local = new locaisViewModel
                {
                    id_locais = item.id_locais,
                    nome = item.nome,
                    Latitude = item.localizacao.Y,
                    Longitude = item.localizacao.X
                };

                locaisTratados.Add(local);
            }

            return locaisTratados;
        }
    }
}
