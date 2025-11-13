using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace GeoturismoAPI.ViewModels
{
    public class LocalCreateDTO
    {
        public Guid usuarios_id { get; set; }
        [Required(ErrorMessage = "O campo nome é obrigatório!")]
        public string nome { get; set; }
        [Required(ErrorMessage = "O campo descricao é obrigatório!")]
        public string descricao { get; set; }
        [Required(ErrorMessage = "O campo endereço é obrigatório!")]
        public string endereco { get; set; }
        [Required(ErrorMessage = "O campo Latitude é obrigatório!")]
        public double Latitude { get; set; }
        [Required(ErrorMessage = "O campo Longitude é obrigatório!")]
        public double Longitude { get; set; }
        //public List<FiltroCreateDTO> filtros { get; set; }
    }

    public class FiltroCreateDTO
    {
        public Guid categorias_id { get; set; }
    }

}
