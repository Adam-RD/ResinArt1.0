import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { PedidoPendiente } from './PedidoPendiente';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidosPendientes: PedidoPendiente[] = [];
  pedidosCompletados: PedidoPendiente[] = [];
  totalPrecioCompletados: number = 0;  // Propiedad para almacenar el total de precios de los pedidos completados

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.getPedidos();  // Obtener los pedidos al iniciar el componente
    this.getTotalPrecioCompletados();  // Obtener el total de precios de los pedidos completados
  }

  getPedidos(): void {
    this.pedidosService.getPedidos().subscribe(pedidos => {
      // Filtrar los pedidos pendientes (no completados) y completados
      this.pedidosPendientes = pedidos.filter(pedido => !pedido.estaCompletado);
      this.pedidosCompletados = pedidos.filter(pedido => pedido.estaCompletado);
    });
  }

  completarPedido(id: number): void {
    // Marcar el pedido como completado
    this.pedidosService.completePedido(id).subscribe(() => {
      this.getPedidos();  // Recargar la lista de pedidos
      this.getTotalPrecioCompletados();  // Actualizar el total de precios completados
    });
  }

  getTotalPrecioCompletados(): void {
    // Obtener el total de precios de los pedidos completados desde el servicio
    this.pedidosService.getTotalPrecioCompletados().subscribe(total => {
      this.totalPrecioCompletados = total;
    });
  }

  // Función para calcular el precio total de un pedido (opcional, si es necesario)
  calcularPrecioTotal(pedido: PedidoPendiente): number {
    return pedido.cantidad * pedido.precioPorUnidad;
  }
}
