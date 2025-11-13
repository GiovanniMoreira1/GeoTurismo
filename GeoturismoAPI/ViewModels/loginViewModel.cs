using System.ComponentModel.DataAnnotations;

namespace GeoturismoAPI.ViewModels
{
    public class loginViewModel
    {
        [Required(ErrorMessage = "O campo email é obrigatório!")]
        public string email { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatório!")]
        public string senha { get; set; }
    }
}
