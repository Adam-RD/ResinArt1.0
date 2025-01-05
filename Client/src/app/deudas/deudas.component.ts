import { Component, OnInit } from '@angular/core';
import { DeudasService } from '../deudas.service';
import { Deuda } from './Deuda';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

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

  deudaSeleccionada: Deuda | null = null;
  aporteIngresado: number = 0;
  isLoading = false;

  // Paginación
  currentPagePendientes: number = 1;
  currentPageCompletadas: number = 1;
  itemsPerPage = 5;

  constructor(private deudasService: DeudasService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getDeudas();
  }

  getDeudas(): void {
    this.isLoading = true;
    this.deudasService.getDeudas().subscribe({
      next: (deudas) => {
        this.deudas = deudas.map(deuda => ({
          ...deuda,
          estado: deuda.deudaTotal === 0 ? 'Completada' : 'Pendiente'
        }));
        this.calcularTotales();
      },
      error: () => {
        this.deudas = [];
        this.calcularTotales();
        this.toastr.error('Error al cargar deudas', 'Error');
      },
      complete: () => this.isLoading = false
    });
  }

  calcularTotales(): void {
    this.totalPrecioTotal = this.deudas.reduce((sum, deuda) => sum + (deuda.precioTotal || 0), 0);
    this.totalDeudaTotal = this.deudas.reduce((sum, deuda) => sum + (deuda.deudaTotal || 0), 0);
    this.totalAporte = this.deudas.reduce((sum, deuda) => sum + (deuda.aporte || 0), 0);
  }

  getDeudasPendientes(): Deuda[] {
    return this.deudas.filter(d => d.estado === 'Pendiente');
  }

  getDeudasCompletadas(): Deuda[] {
    return this.deudas.filter(d => d.estado === 'Completada');
  }

  abrirModal(deuda: Deuda): void {
    this.deudaSeleccionada = deuda;
    this.aporteIngresado = 0;
    const modal = new bootstrap.Modal(document.getElementById('aporteModal')!);
    modal.show();
  }

  cerrarModal(): void {
    const modalElement = document.getElementById('aporteModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
    }
    this.deudaSeleccionada = null;
    this.aporteIngresado = 0;
  }

  guardarAporte(): void {
    if (!this.deudaSeleccionada) {
      this.toastr.error('No se pudo encontrar la deuda seleccionada.', 'Error');
      return;
    }

    if (this.aporteIngresado > this.deudaSeleccionada.deudaTotal) {
      this.toastr.error('El aporte no puede ser mayor a la deuda restante.', 'Error');
      return;
    }

    this.deudasService.addAporte(this.deudaSeleccionada.id, this.aporteIngresado).subscribe({
      next: () => {
        this.toastr.success('Aporte agregado correctamente.', 'Éxito');
        this.getDeudas();
        this.cerrarModal();
      },
      error: (err) => {
        this.toastr.error('Hubo un error al guardar el aporte.', 'Error');
        console.error('Error al guardar el aporte:', err);
      }
    });
  }
}
