using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<PedidoPendiente> PedidosPendientes { get; set; }
        public DbSet<Deuda> Deudas { get; set; }

        public DbSet<User> Users { get; set; }
    }
}


