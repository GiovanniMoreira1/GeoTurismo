using GeoturismoAPI.Domains;
using GeoturismoAPI.ViewModels;

namespace GeoturismoAPI.Interfaces
{
    public interface IEventoInterface
    {
        /// <summary>
        /// Metodo para criar novos eventos
        /// </summary>
        /// <param name="novoEvento"></param>
        void CriarEvento(eventoViewModel novoEvento);

        /// <summary>
        /// Metodo para listar todos os eventos
        /// </summary>
        /// <returns>Uma lista com todos os eventos válidos</returns>
        List<evento> ListarEventos();

        /// <summary>
        /// Metodo para buscar um evento especifico
        /// </summary>
        /// <param name="Id">Id do evento</param>
        /// <returns>As informacoes desse evento</returns>
        evento BuscarId(Guid Id);

        /// <summary>
        /// Metodo responsavel por deletar eventos
        /// </summary>
        /// <param name="Id">Id do evento a ser deletado</param>
        void DeletarEvento(Guid Id);
    }
}
