import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deuda } from './deudas/Deuda';
import { environment } from '../environments/environment';// Importa el entorno para obtener la URL de la API

@Injectable({
  providedIn: 'root'
})
export class DeudasService {
  private apiUrl = environment.apiUrl + '/Deudas'; // Usa la URL de la API del entorno
  constructor(private http: HttpClient) {}

  getDeudas(): Observable<Deuda[]> {
    return this.http.get<Deuda[]>(this.apiUrl);
  }

  addAporte(id: number, aporte: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/aporte`, aporte);
  }

  addDeuda(deuda: Deuda): Observable<Deuda> {
    return this.http.post<Deuda>(this.apiUrl, deuda);
  }
}
