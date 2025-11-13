namespace GeoturismoAPI.Utils
{
    public class Distancia
    {
        public static double Radians(double x)
        {
            return x * Math.PI / 180;
        }

        public static double GreatCircleDistance(double lat1, double lon1, double lat2, double lon2)

        {
            double R = 6371e3;

            double cLon = Math.Cos(Radians(lon1) - Radians(lon2));
            double sLat1 = Math.Sin(Radians(lat1));
            double sLat2 = Math.Sin(Radians(lat2));
            double cLat1 = Math.Cos(Radians(lat1));
            double cLat2 = Math.Cos(Radians(lat2));

            double cosD = sLat1 * sLat2 + cLat1 * cLat2 * cLon;

            double d = Math.Acos(cosD);

            double dist = R * d;

            return dist;
        }
    }
}
