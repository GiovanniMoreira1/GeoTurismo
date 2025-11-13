namespace GeoturismoAPI.ViewModels
{
    public class eventoViewModel
    {
        public string nome_evento { get; set; } = null!;
        public DateTime data_inicio { get; set; }
        public DateTime data_fim { get; set; }
        public Guid idLocal { get; set; }
    }
}
