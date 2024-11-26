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
    precioPorUnidad: 0,
    cantidad: 1,  // Valor predeterminado de cantidad
    precioTotal: 0,  // Esto lo calcularemos en base a cantidad y precio por unidad
    fechaCreacion: new Date(),  // Fecha de creación predeterminada
    id: 0,
    estaCompletado: false
  };

  constructor(private pedidosService: PedidosService, private toastr: ToastrService) {}

  // Función para actualizar el precio total al cambiar cantidad o precioPorUnidad
  actualizarPrecioTotal(): void {
    this.pedido.precioTotal = this.pedido.cantidad * this.pedido.precioPorUnidad;
  }

  // Función para agregar el pedido
  agregarPedido() {
    if (this.pedido.precioPorUnidad <= 0 || this.pedido.cantidad <= 0) {
      this.toastr.error('La cantidad y el precio deben ser mayores a 0', 'Error');
      return;
    }

    // Calculamos el precio total
    this.actualizarPrecioTotal();

    // Ahora creamos el pedido
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

  // Función para resetear el formulario
  resetForm(): void {
    this.pedido = {
      nombreArticulo: '',
      nombreCliente: '',
      detalle: '',
      precioPorUnidad: 0,
      cantidad: 1,
      precioTotal: 0,
      fechaCreacion: new Date(),
      id: 0,
      estaCompletado: false
    };
  }
}
