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
  totalPrecioCompletados: number = 0;

  isLoading = false;


  currentPagePendientes: number = 1;
  currentPageCompletados: number = 1;
  itemsPerPage = 5;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.getPedidos();
    this.getTotalPrecioCompletados();
  }

  getPedidos(): void {
    this.isLoading = true;
    this.pedidosService.getPedidos().subscribe(pedidos => {
      this.pedidosPendientes = pedidos.filter(pedido => !pedido.estaCompletado);
      this.pedidosCompletados = pedidos.filter(pedido => pedido.estaCompletado);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  completarPedido(id: number): void {
    this.pedidosService.completePedido(id).subscribe(() => {
      this.getPedidos();
      this.getTotalPrecioCompletados();
    });
  }

  getTotalPrecioCompletados(): void {
    this.pedidosService.getTotalPrecioCompletados().subscribe(total => {
      this.totalPrecioCompletados = total;
    });
  }
}
