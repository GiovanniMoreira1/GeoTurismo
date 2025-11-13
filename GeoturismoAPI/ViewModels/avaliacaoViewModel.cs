namespace GeoturismoAPI.ViewModels
{
    public class avaliacaoViewModel
    {
        public Guid usuarios_id { get; set; }

        public Guid locais_id { get; set; }

        public int nota { get; set; }

        public string? comentario { get; set; }

        public DateTime? data_avaliacao { get; set; }
    }
}
