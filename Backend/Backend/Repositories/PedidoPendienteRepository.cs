using Backend.Data;
using Backend.Models;
using System.Linq;

namespace Backend.Repositories
{
    public class PedidoPendienteRepository : IPedidoPendienteRepository
    {
        private readonly ApplicationDbContext _context;

        public PedidoPendienteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Obtener todos los pedidos pendientes
        public IEnumerable<PedidoPendiente> GetAll()
        {
            return _context.PedidosPendientes.ToList();
        }

        // Obtener un pedido pendiente por su ID
        public PedidoPendiente GetById(int id)
        {
            return _context.PedidosPendientes.FirstOrDefault(p => p.Id == id);
        }

        // Agregar un nuevo pedido pendiente
        public void Add(PedidoPendiente pedidoPendiente)
        {
            _context.PedidosPendientes.Add(pedidoPendiente);
            _context.SaveChanges();
        }

        // Eliminar un pedido pendiente
        public void Delete(int id)
        {
            var pedido = _context.PedidosPendientes.FirstOrDefault(p => p.Id == id);
            if (pedido != null)
            {
                _context.PedidosPendientes.Remove(pedido);
                _context.SaveChanges();
            }
        }

        // Marcar un pedido como completado
        public void Complete(int id)
        {
            var pedido = _context.PedidosPendientes.FirstOrDefault(p => p.Id == id);
            if (pedido != null)
            {
                pedido.EstaCompletado = true;
                _context.SaveChanges();
            }
        }

        // Obtener el total de precios de los pedidos completados (PrecioTotal = Cantidad * PrecioPorUnidad)
        public decimal GetTotalPrecioCompletados()
        {
            return _context.PedidosPendientes
                           .Where(p => p.EstaCompletado)
                           .Sum(p => p.Cantidad * p.PrecioPorUnidad); // Calcular el precio total
        }
    }
}
