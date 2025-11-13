namespace GeoturismoAPI.ViewModels
{
    public class locaisOficiaisViewModel
    {
        public Guid locais_id { get; set; }
        public Guid prefeitura_id { get; set; }
        public DateTime? data_oficializacao { get; set; }
        public bool? oficializado { get; set; }
    }
}
