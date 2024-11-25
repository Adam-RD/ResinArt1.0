import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PedidoPendiente } from './pedidos/PedidoPendiente';
import { environment } from '../environments/environment';// Importa el entorno para obtener la URL de la API

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiUrl + '/PedidosPendientes'; // Usa la URL de la API del entorno

  // Un Subject para comunicar eventos entre componentes
  private actualizarPedidosSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<PedidoPendiente[]> {
    return this.http.get<PedidoPendiente[]>(this.apiUrl);
  }

  getPedidoById(id: number): Observable<PedidoPendiente> {
    return this.http.get<PedidoPendiente>(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: PedidoPendiente): Observable<PedidoPendiente> {
    return this.http.post<PedidoPendiente>(this.apiUrl, pedido);
  }

  updatePedido(id: number, pedido: PedidoPendiente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pedido);
  }

  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  completePedido(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/completar`, {});
  }

  getTotalPrecioCompletados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-precio-completados`);
  }

  // Método para notificar que los pedidos deben actualizarse
  notificarActualizacionPedidos() {
    this.actualizarPedidosSubject.next();
  }

  // Observable para que otros componentes se suscriban y escuchen
  obtenerActualizacionPedidos(): Observable<void> {
    return this.actualizarPedidosSubject.asObservable();
  }
}
