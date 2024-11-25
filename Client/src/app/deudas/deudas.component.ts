import { Component, OnInit } from '@angular/core';
import { DeudasService } from '../deudas.service';
import { Deuda } from './Deuda';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})
export class DeudasComponent implements OnInit {
  deudas: Deuda[] = [];
  totalPrecioTotal: number = 0;
  totalDeudaTotal: number = 0;
  totalAporte: number = 0;

  constructor(private deudasService: DeudasService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getDeudas();
  }

  getDeudas(): void {
    this.deudasService.getDeudas().subscribe(deudas => {
      this.deudas = deudas;
      this.calcularTotales();
    });
  }

  calcularTotales(): void {
    this.totalPrecioTotal = this.deudas.reduce((sum, deuda) => sum + deuda.precioTotal, 0);
    this.totalDeudaTotal = this.deudas.reduce((sum, deuda) => sum + deuda.deudaTotal, 0);
    this.totalAporte = this.deudas.reduce((sum, deuda) => sum + deuda.aporte, 0);
  }

  agregarAporte(id: number, aporte: number): void {
    const deuda = this.deudas.find(d => d.id === id);

    if (deuda && aporte > deuda.deudaTotal) {
      this.toastr.error('El aporte no puede ser mayor a la deuda restante.', 'Error');
      return;
    }

    this.deudasService.addAporte(id, aporte).subscribe({
      next: () => {
        this.toastr.success('Aporte agregado correctamente.', 'Éxito');
        this.getDeudas(); // Recargar la lista de deudas para reflejar los cambios
      },
      error: (err) => {
        this.toastr.error('Hubo un error al agregar el aporte.', 'Error');
        console.error('Error al agregar el aporte:', err);
      }
    });
  }
}
