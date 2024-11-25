import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/Auth'; // Usa la URL de la API del entorno

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Método para registrar un usuario
  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Recupera el token JWT del almacenamiento local
    return !!token; // Devuelve true si existe un token
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
  }
}
