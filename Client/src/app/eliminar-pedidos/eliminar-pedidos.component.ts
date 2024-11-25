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

  constructor(private pedidosService: PedidosService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    this.pedidosService.getPedidos().subscribe(pedidos => {
      this.pedidosPendientes = pedidos.filter(pedido => !pedido.estaCompletado);
      this.pedidosCompletados = pedidos.filter(pedido => pedido.estaCompletado);
    });
  }

  completarPedido(id: number): void {
    this.pedidosService.completePedido(id).subscribe(() => {
      this.toastr.success('Pedido completado correctamente', 'Éxito');
      this.getPedidos(); // Recargar la lista de pedidos para reflejar los cambios
    }, error => {
      this.toastr.error('Hubo un error al completar el pedido', 'Error');
    });
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      this.pedidosService.deletePedido(id).subscribe(() => {
        this.toastr.success(`Pedido con id ${id} eliminado.`, 'Éxito');
        this.getPedidos(); // Recargar la lista de pedidos después de eliminar
      }, error => {
        this.toastr.error('Hubo un error al eliminar el pedido', 'Error');
      });
    }
  }
}
