using System;
using System.Collections.Generic;
using NetTopologySuite.Geometries;

namespace GeoturismoAPI.Domains;

public partial class locai
{
    public Guid id_locais { get; set; }

    public Guid usuarios_id { get; set; }

    public string nome { get; set; } = null!;

    public string descricao { get; set; } = null!;

    public string endereco { get; set; } = null!;

    public Point localizacao { get; set; } = null!;

    public double? media_avaliacao { get; set; }

    public virtual ICollection<avaliaco> avaliacos { get; set; } = new List<avaliaco>();

    public virtual ICollection<filtro> filtros { get; set; } = new List<filtro>();

    public virtual ICollection<locaisoficiai> locaisoficiais { get; set; } = new List<locaisoficiai>();

    public virtual usuario usuarios { get; set; } = null!;
}
