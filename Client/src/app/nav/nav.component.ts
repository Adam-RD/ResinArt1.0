import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout(); // Llama al método para cerrar sesión
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
