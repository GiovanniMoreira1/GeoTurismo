using System.ComponentModel.DataAnnotations;

namespace GeoturismoAPI.ViewModels
{
    public class usuarioViewModel
    {
        [Required(ErrorMessage = "O campo nome é obrigatório!")]
        public string nome { get; set; }
        [Required(ErrorMessage = "O campo email é obrigatório!")]
        public string email { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatório!")]
        public string senha { get; set; }
    }
}
