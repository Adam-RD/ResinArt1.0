using Backend.Models;

namespace Backend.Repositories
{
    public interface IDeudaRepository
    {
        IEnumerable<Deuda> GetAll();
        Deuda GetById(int id);
        void Add(Deuda deuda);
        void UpdateAporte(int id, decimal aporte);
    }
}
