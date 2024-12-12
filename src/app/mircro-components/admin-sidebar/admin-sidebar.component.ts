import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  activeItem: string = '';

  constructor(private router: Router) {}

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    
    // Manejar la navegación según el ítem seleccionado
    switch(itemId) {
      case 'Coaches':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'Clientes':
        this.router.navigate(['/clients']);
        break;
      case 'Membresias':
        this.router.navigate(['/memberships']);
        break;
      case 'Estadisticas':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'logout':
        this.logout();
        break;
    }
  }

  logout() {
    localStorage.removeItem('access_token');  // Elimina el token
    this.router.navigate(['/login']);  // Redirige al login
  }
}
