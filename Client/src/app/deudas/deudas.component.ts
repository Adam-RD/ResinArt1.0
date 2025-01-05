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

  deudaSeleccionada: Deuda | null = null; // Para manejar la deuda seleccionada en el modal
  isLoading = false; // Estado del spinner de carga

  // Paginación
  currentPagePendientes: number = 1;
  currentPageCompletados: number = 1;
  itemsPerPage = 5;

  constructor(private deudasService: DeudasService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getDeudas();
  }

  // Obtener la lista de deudas desde el servicio
  getDeudas(): void {
    this.isLoading = true;
    this.deudasService.getDeudas().subscribe(deudas => {
      this.deudas = deudas.map(deuda => ({
        ...deuda,
        estado: deuda.deudaTotal === 0 ? 'Completada' : 'Pendiente' // Actualizar estado basado en deuda restante
      }));
      this.calcularTotales();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.toastr.error('Error al cargar deudas', 'Error');
    });
  }

  // Calcular los totales de las columnas
  calcularTotales(): void {
    this.totalPrecioTotal = this.deudas.reduce((sum, deuda) => sum + deuda.precioTotal, 0);
    this.totalDeudaTotal = this.deudas.reduce((sum, deuda) => sum + deuda.deudaTotal, 0);
    this.totalAporte = this.deudas.reduce((sum, deuda) => sum + deuda.aporte, 0);
  }

  // Abrir el modal para capturar el aporte
  abrirModal(deuda: Deuda): void {
    this.deudaSeleccionada = { ...deuda }; // Copia para evitar cambios directos
    const modal = new bootstrap.Modal(document.getElementById('aporteModal')!);
    modal.show();
  }

  // Guardar el aporte ingresado en el modal
  guardarAporte(): void {
    if (!this.deudaSeleccionada) {
      this.toastr.error('No se pudo encontrar la deuda seleccionada.', 'Error');
      return;
    }

    const { id, aporte, deudaTotal } = this.deudaSeleccionada;

    if (aporte > deudaTotal) {
      this.toastr.error('El aporte no puede ser mayor a la deuda restante.', 'Error');
      return;
    }

    this.deudasService.addAporte(id, aporte).subscribe({
      next: () => {
        this.toastr.success('Aporte agregado correctamente.', 'Éxito');
        this.getDeudas(); // Recargar la lista de deudas para reflejar los cambios
        const modal = bootstrap.Modal.getInstance(document.getElementById('aporteModal')!);
        modal?.hide();
        this.deudaSeleccionada = null; // Limpiar la deuda seleccionada
      },
      error: (err) => {
        this.toastr.error('Hubo un error al guardar el aporte.', 'Error');
        console.error('Error al guardar el aporte:', err);
      }
    });
  }
}
