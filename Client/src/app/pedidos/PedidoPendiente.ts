export interface PedidoPendiente {
  id?: number;
  nombreArticulo: string;
  nombreCliente: string;
  detalle?: string;
  cantidad: number;
  precioPorUnidad: number;
  precioTotal?: number;
  fechaCreacion: Date;  // Cambiado de string a Date
  estaCompletado: boolean;
}
