using NetTopologySuite.Geometries;

namespace GeoturismoAPI.ViewModels
{
    public class locaisViewModel
    {
        public Guid usuarios_id { get; set; }
        public string nome { get; set; }
        public string descricao { get; set; }
        public string endereco { get; set; }
        public Point localizacao { get; set; }
        public double? media_avaliacao { get; set; }
    }
}
