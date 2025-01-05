import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('navbarNav') navbarNav!: ElementRef; // Referencia al menú de navegación
  isLoggingOut = false;

  constructor(public authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.isLoggingOut = true;
    this.authService.logout();

    setTimeout(() => {
      this.isLoggingOut = false;
      this.router.navigate(['/login']);
    }, 1500);
  }

  closeNavbar(): void {
    if (this.navbarNav) {
      const nav = this.navbarNav.nativeElement;
      if (nav.classList.contains('show')) {
        nav.classList.remove('show'); // Cierra el menú en dispositivos móviles
      }
    }
  }
}
