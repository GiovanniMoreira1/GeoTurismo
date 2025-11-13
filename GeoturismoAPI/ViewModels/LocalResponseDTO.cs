using GeoturismoAPI.Domains;
using NetTopologySuite.Geometries;

namespace GeoturismoAPI.ViewModels
{
    public class LocalResponseDTO
    {
        public Guid id_locais { get; set; }

        public string nome { get; set; } = null!;

        public string descricao { get; set; } = null!;

        public Point localizacao { get; set; } = null!;

        public double? media_avaliacao { get; set; }

        public virtual ICollection<String> categorias { get; set; } = new List<String>();
    }
}
