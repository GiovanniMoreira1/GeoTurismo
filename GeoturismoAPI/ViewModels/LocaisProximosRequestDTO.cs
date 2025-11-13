namespace GeoturismoAPI.ViewModels
{
    public class LocaisProximosRequestDTO
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Metros { get; set; } = 100;
    }
}
