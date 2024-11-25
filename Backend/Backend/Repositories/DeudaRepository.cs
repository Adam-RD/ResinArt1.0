using Backend.Data;
using Backend.Models;

namespace Backend.Repositories
{
    public class DeudaRepository : IDeudaRepository
    {
        private readonly ApplicationDbContext _context;

        public DeudaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Deuda> GetAll()
        {
            return _context.Deudas.ToList();
        }

        public Deuda GetById(int id)
        {
            return _context.Deudas.FirstOrDefault(d => d.Id == id);
        }

        public void Add(Deuda deuda)
        {
            deuda.DeudaTotal = deuda.PrecioTotal; // Inicializa la deuda total al valor del precio total
            _context.Deudas.Add(deuda);
            _context.SaveChanges();
        }

        public void UpdateAporte(int id, decimal aporte)
        {
            var deuda = _context.Deudas.FirstOrDefault(d => d.Id == id);
            if (deuda != null)
            {
                deuda.Aporte += aporte;

                // Recalcular la deuda total
                deuda.DeudaTotal = deuda.PrecioTotal - deuda.Aporte;

                // No es necesario actualizar 'EsDeudaCompleta', ya que se calcula automáticamente
                _context.SaveChanges();
            }
        }
    }
}
