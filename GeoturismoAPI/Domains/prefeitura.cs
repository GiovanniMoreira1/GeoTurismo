using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class prefeitura
{
    public Guid id_prefeituras { get; set; }

    public Guid usuarios_id { get; set; }

    public string responsavel { get; set; } = null!;

    public string orgao { get; set; } = null!;

    public virtual ICollection<locaisoficiai> locaisoficiais { get; set; } = new List<locaisoficiai>();

    public virtual usuario usuarios { get; set; } = null!;
}
