export interface Deuda {
  id: number;
  nombreArticulo: string;
  nombreCliente: string;
  precioTotal: number;
  deudaTotal: number;
  aporte: number;
  esDeudaCompleta: boolean;
}
