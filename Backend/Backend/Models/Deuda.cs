namespace Backend.Models
{
    public class Deuda
    {
        public int Id { get; set; }
        public string NombreArticulo { get; set; } = string.Empty;
        public string NombreCliente { get; set; } = string.Empty;
        public decimal PrecioTotal { get; set; }
        public decimal DeudaTotal { get; set; }
        public decimal Aporte { get; set; }
        public bool EsDeudaCompleta => Aporte >= PrecioTotal;
    }
}
