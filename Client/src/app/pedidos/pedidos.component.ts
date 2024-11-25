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
  totalPrecioCompletados: number = 0;  // Nueva propiedad para almacenar el total de precios

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.getPedidos();
    this.getTotalPrecioCompletados();  // Obtener el total de precios completados al iniciar el componente
  }

  getPedidos(): void {
    this.pedidosService.getPedidos().subscribe(pedidos => {
      this.pedidosPendientes = pedidos.filter(pedido => !pedido.estaCompletado);
      this.pedidosCompletados = pedidos.filter(pedido => pedido.estaCompletado);
    });
  }

  completarPedido(id: number): void {
    this.pedidosService.completePedido(id).subscribe(() => {
      this.getPedidos(); // Recargar la lista de pedidos para reflejar los cambios
      this.getTotalPrecioCompletados(); // Actualizar el total de precios completados
    });
  }

  getTotalPrecioCompletados(): void {
    this.pedidosService.getTotalPrecioCompletados().subscribe(total => {
      this.totalPrecioCompletados = total;
    });
  }
}

