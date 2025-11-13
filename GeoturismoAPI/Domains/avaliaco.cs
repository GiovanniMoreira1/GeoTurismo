using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class avaliaco
{
    public Guid id_avaliacoes { get; set; }

    public Guid usuarios_id { get; set; }

    public Guid locais_id { get; set; }

    public int nota { get; set; }

    public string? comentario { get; set; }

    public DateTime? data_avaliacao { get; set; }

    public virtual locai locais { get; set; } = null!;

    public virtual usuario usuarios { get; set; } = null!;
}
