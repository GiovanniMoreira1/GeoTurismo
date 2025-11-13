using NetTopologySuite.Geometries;

namespace GeoturismoAPI.ViewModels
{
    public class LocalCreateDTO
    {
        public Guid usuarios_id { get; set; }
        public string nome { get; set; }
        public string descricao { get; set; }
        public string endereco { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        //public List<FiltroCreateDTO> filtros { get; set; }
    }

    public class FiltroCreateDTO
    {
        public Guid categorias_id { get; set; }
    }

}
