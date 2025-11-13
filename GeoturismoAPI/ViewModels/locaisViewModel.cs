namespace GeoturismoAPI.ViewModels
{
    public class locaisViewModel
    {
        public Guid id_locais { get; set; }
        public string nome { get; set; } = null!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
