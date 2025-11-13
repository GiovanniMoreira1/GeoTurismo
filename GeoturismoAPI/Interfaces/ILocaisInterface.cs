using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface ILocaisInterface
    {
        /// <summary>
        /// Metodo responsavel por cadastrar novos locais
        /// </summary>
        /// <param name="localNovo">Infos do novo local</param>
        void CriarLocal(locaisViewModel localNovo);

        /// <summary>
        /// Metodo responsavel por editar as informacoes de um local oficial
        /// </summary>
        /// <param name="Id">Id do local a ser editado</param>
        /// <param name="novasInfos">Novas informações a serem adicionadas nesse local</param>
        void EditarLocalOficial(Guid Id, locaisViewModel novasInfos);

        /// <summary>
        /// Metodo responsavel por deletar um local criado por um usuario
        /// </summary>
        /// <param name="idLocal">Id a ser buscado</param>
        /// <param name="idUsuario">Id do dono do local</param>
        void DeletarLocal(Guid idLocal, Guid idUsuario);

        /// <summary>
        /// Listar todos os locais
        /// </summary>
        /// <returns>Uma lista de locais</returns>
        List<locai> ListarLocais();

        /// <summary>
        /// Metodo responsavel por buscar um local especifico pelo ID
        /// </summary>
        /// <param name="id">Id a ser buscado</param>
        /// <returns>Um local especifico</returns>
        locai BuscarId(Guid id);

        /// <summary>
        /// Método responsavel por retornar uma lista de locais que pertencem a determinadas categorias
        /// </summary>
        /// <param name="IdCategoria">Id das categorias que estão sendo buscadas</param>
        /// <returns>Uma lista de locais que fazem parte de uma categoria</returns>
        List<locai> BuscarIdCategoria(List<Guid> IdCategoria);

        /// <summary>
        /// Metodo responsavel por tornar um local criado por usuario padrão algo oficial de uma prefeitura
        /// </summary>
        /// <param name="localOficial">Informações sobre a oficialização</param>
        void OficializarLocal(locaisOficiaisViewModel localOficial);
    }
}
