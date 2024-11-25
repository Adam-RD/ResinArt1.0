namespace Backend.Models
{
    public class PedidoPendiente
    {
        public int Id { get; set; }
        public required string NombreArticulo { get; set; } = string.Empty;
        public required string NombreCliente { get; set; } = string.Empty;
        public required string Detalle { get; set; } = string.Empty;
        public required decimal Precio { get; set; } = 0;
        public bool EstaCompletado { get; set; } = false;
    }
}
