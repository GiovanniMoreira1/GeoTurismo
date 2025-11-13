using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class usuario
{
    public Guid id_usuarios { get; set; }

    public string nome { get; set; } = null!;

    public string email { get; set; } = null!;

    public string senha { get; set; } = null!;

    public virtual ICollection<avaliaco> avaliacos { get; set; } = new List<avaliaco>();

    public virtual ICollection<locai> locais { get; set; } = new List<locai>();

    public virtual ICollection<prefeitura> prefeituras { get; set; } = new List<prefeitura>();
}
