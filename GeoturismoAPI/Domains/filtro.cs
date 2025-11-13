using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class filtro
{
    public Guid id_filtros { get; set; }

    public Guid locais_id { get; set; }

    public Guid categorias_id { get; set; }

    public virtual categoria categorias { get; set; } = null!;

    public virtual locai locais { get; set; } = null!;
}
