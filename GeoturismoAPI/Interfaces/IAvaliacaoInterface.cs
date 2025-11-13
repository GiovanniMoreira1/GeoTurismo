using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface IAvaliacaoInterface
    {
        /// <summary>
        /// Metodo responsavel por cadastrar uma nova avaliacao em um local
        /// </summary>
        /// <param name="novaAvaliacao">Infos da nova avaliacao</param>
        void CadastrarAvaliacao(avaliacaoViewModel novaAvaliacao);

        /// <summary>
        /// Metodo responsavel por buscar as avaliacoes de um local especifico
        /// </summary>
        /// <param name="IdLocal">Id do local que queremos ver as avaliacoes</param>
        /// <returns>Uma lista de avaliacoes de um local</returns>
        List<avaliaco> BuscarAvaliacoes(Guid IdLocal);
    }
}
