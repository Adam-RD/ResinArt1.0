using Backend.Models;

namespace Backend.Repositories
{
    public interface IPedidoPendienteRepository
    {
        IEnumerable<PedidoPendiente> GetAll();
        PedidoPendiente GetById(int id);
        void Add(PedidoPendiente pedidoPendiente);
        void Delete(int id);

        void Complete(int id);

        decimal GetTotalPrecioCompletados();
    }
}
