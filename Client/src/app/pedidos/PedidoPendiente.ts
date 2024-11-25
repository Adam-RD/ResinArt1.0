
export interface PedidoPendiente {
  id?: number;  // Hacemos que `id` sea opcional, ya que no es necesario al crear un pedido nuevo
  nombreArticulo: string;
  nombreCliente: string;
  detalle?: string;
  precio: number;
  estaCompletado: boolean;
}
