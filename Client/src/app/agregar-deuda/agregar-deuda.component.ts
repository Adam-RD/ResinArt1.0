import { Component } from '@angular/core';
import { DeudasService } from '../deudas.service';
import { Deuda } from '../deudas/Deuda';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-deuda',
  templateUrl: './agregar-deuda.component.html',
  styleUrls: ['./agregar-deuda.component.css']
})
export class AgregarDeudaComponent {
  nuevaDeuda: Deuda = {
    id: 0,
    nombreArticulo: '',
    nombreCliente: '',
    precioTotal: 0,
    deudaTotal: 0,
    aporte: 0,
    esDeudaCompleta: false
  };

  constructor(private deudasService: DeudasService, private toastr: ToastrService) {}

  agregarDeuda(): void {
    if (this.nuevaDeuda.precioTotal <= 0) {
      this.toastr.error('El precio total debe ser mayor a 0', 'Error');
      return;
    }

    this.nuevaDeuda.deudaTotal = this.nuevaDeuda.precioTotal;

    this.deudasService.addDeuda(this.nuevaDeuda).subscribe({
      next: (deuda) => {
        console.log('Deuda añadida:', deuda);
        this.toastr.success('Deuda añadida correctamente', 'Éxito');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al añadir la deuda:', err);
        this.toastr.error('Hubo un error al añadir la deuda', 'Error');
      }
    });
  }

  resetForm(): void {
    this.nuevaDeuda = {
      id: 0,
      nombreArticulo: '',
      nombreCliente: '',
      precioTotal: 0,
      deudaTotal: 0,
      aporte: 0,
      esDeudaCompleta: false
    };
  }
}
