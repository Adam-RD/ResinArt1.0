import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { PedidoPendiente } from '../pedidos/PedidoPendiente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar-pedidos',
  templateUrl: './eliminar-pedidos.component.html',
  styleUrls: ['./eliminar-pedidos.component.css']
})
export class EliminarPedidosComponent implements OnInit {

  pedidosPendientes: PedidoPendiente[] = [];
  pedidosCompletados: PedidoPendiente[] = [];
  isLoading = false;


  currentPagePendientes: number = 1;
  currentPageCompletados: number = 1;
  itemsPerPage = 5;

  constructor(private pedidosService: PedidosService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    this.isLoading = true;
    this.pedidosService.getPedidos().subscribe(pedidos => {
      this.pedidosPendientes = pedidos.filter(pedido => !pedido.estaCompletado);
      this.pedidosCompletados = pedidos.filter(pedido => pedido.estaCompletado);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.toastr.error('Error al cargar pedidos', 'Error');
    });
  }

  completarPedido(id: number): void {
    this.pedidosService.completePedido(id).subscribe(() => {
      this.toastr.success('Pedido completado correctamente', 'Éxito');
      this.getPedidos();
    }, () => {
      this.toastr.error('Hubo un error al completar el pedido', 'Error');
    });
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      this.pedidosService.deletePedido(id).subscribe(() => {
        this.toastr.success(`Pedido con ID ${id} eliminado`, 'Éxito');
        this.getPedidos();
      }, () => {
        this.toastr.error('Hubo un error al eliminar el pedido', 'Error');
      });
    }
  }
}
