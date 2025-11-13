using System;
using System.Collections.Generic;

namespace GeoturismoAPI.Domains;

public partial class evento
{
    public Guid id_eventos { get; set; }

    public string nome_evento { get; set; } = null!;

    public DateTime data_inicio { get; set; }

    public DateTime data_fim { get; set; }
}
