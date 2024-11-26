namespace Backend.Models
{
    public class PedidoPendiente
    {
        public int Id { get; set; }
        public required string NombreArticulo { get; set; } = string.Empty;
        public required string NombreCliente { get; set; } = string.Empty;
        public required string Detalle { get; set; } = string.Empty;
        public bool EstaCompletado { get; set; } = false;
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public int Cantidad { get; set; } = 1;
        public decimal PrecioPorUnidad { get; set; } = 0;
        public decimal PrecioTotal => Cantidad * PrecioPorUnidad;
    }

}
