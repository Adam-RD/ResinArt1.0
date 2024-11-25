import { Component } from '@angular/core';
import { PedidosService } from '../../pedidos.service';
import { PedidoPendiente } from '../PedidoPendiente';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agregar-pedidos',
  templateUrl: './agregar-pedidos.component.html',
  styleUrls: ['./agregar-pedidos.component.css']
})
export class AgregarPedidosComponent {

  totalPrecioCompletados: number = 0;

  pedido: PedidoPendiente = {
    nombreArticulo: '',
    nombreCliente: '',
    detalle: '',
    precio: 0,
    id: 0,
    estaCompletado: false
  };

  constructor(private pedidosService: PedidosService, private toastr: ToastrService) {}

  agregarPedido() {
    if (this.pedido.precio <= 0) {
      this.toastr.error('El precio debe ser mayor a 0', 'Error');
      return;
    }

    this.pedidosService.createPedido(this.pedido).subscribe({
      next: (nuevoPedido) => {
        console.log('Pedido agregado:', nuevoPedido);
        this.toastr.success('Pedido agregado correctamente', 'Éxito');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al agregar el pedido:', err);
        this.toastr.error('Hubo un error al agregar el pedido', 'Error');
      }
    });
  }

  resetForm(): void {
    this.pedido = {
      nombreArticulo: '',
      nombreCliente: '',
      detalle: '',
      precio: 0,
      id: 0,
      estaCompletado: false
    };
  }
}

