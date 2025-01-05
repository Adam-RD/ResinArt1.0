import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false; // Estado del spinner de carga

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.toastr.warning('Por favor ingresa usuario y contraseña.', 'Atención');
      return;
    }

    this.isLoading = true; // Activar el spinner

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
        this.router.navigate(['/pedidos']);
        this.isLoading = false; // Desactivar el spinner
      },
      error: (err) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.toastr.error(this.errorMessage, 'Error');
        console.error('Error al iniciar sesión', err);
        this.isLoading = false; // Desactivar el spinner
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
