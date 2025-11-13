namespace GeoturismoAPI.ViewModels
{
    public class LocaisProximosResponseDTO
    {
        public Guid id_local { get; set; }
        public string nome { get; set; }
        public string endereco { get; set; }
        public double longitude { get; set; }
        public double latitude { get; set; }
        public double distancia { get; set; }
    }
}
