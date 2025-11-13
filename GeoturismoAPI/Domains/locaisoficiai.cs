using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class locaisoficiai
{
    public Guid id_locais_oficiais { get; set; }

    public Guid locais_id { get; set; }

    public Guid prefeitura_id { get; set; }

    public DateTime? data_oficializacao { get; set; }

    public bool? oficializado { get; set; }

    public virtual locai locais { get; set; } = null!;

    public virtual prefeitura prefeitura { get; set; } = null!;
}
