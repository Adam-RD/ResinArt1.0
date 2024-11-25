using Backend.Data;
using Backend.Models;

namespace Backend.Repositories
{
    public class PedidoPendienteRepository : IPedidoPendienteRepository
    {
        private readonly ApplicationDbContext _context;

        public PedidoPendienteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PedidoPendiente> GetAll()
        {
            return _context.PedidosPendientes.ToList();
        }

        public PedidoPendiente GetById(int id)
        {
            return _context.PedidosPendientes.FirstOrDefault(p => p.Id == id);
        }

        public void Add(PedidoPendiente pedidoPendiente)
        {
            _context.PedidosPendientes.Add(pedidoPendiente);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pedido = _context.PedidosPendientes.FirstOrDefault(p => p.Id == id);
            if (pedido != null)
            {
                _context.PedidosPendientes.Remove(pedido);
                _context.SaveChanges();
            }
        }

        public void Complete(int id)
        {
            var pedido = _context.PedidosPendientes.FirstOrDefault(p => p.Id == id);
            if (pedido != null)
            {
                pedido.EstaCompletado = true; // Asumimos que hay una propiedad para marcar como completado
                _context.SaveChanges();
            }


        }

        public decimal GetTotalPrecioCompletados()
        {
            return _context.PedidosPendientes.Where(p => p.EstaCompletado).Sum(p => p.Precio);
        }

    }
}
