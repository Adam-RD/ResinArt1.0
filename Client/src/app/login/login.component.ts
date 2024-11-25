import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Puedes almacenar el token en el localStorage o en un servicio
        localStorage.setItem('token', response.token);
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error', err);
      }
    });

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
