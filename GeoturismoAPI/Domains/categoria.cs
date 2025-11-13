using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class categoria
{
    public Guid id_categorias { get; set; }

    public string nome { get; set; } = null!;

    public string? descricao { get; set; }

    public virtual ICollection<filtro> filtros { get; set; } = new List<filtro>();
}
