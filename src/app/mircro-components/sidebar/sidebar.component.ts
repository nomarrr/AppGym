import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeItem: string = '';

  constructor(private router: Router) {}

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    
    // Manejar la navegación según el ítem seleccionado
    switch(itemId) {
      case 'entrenamiento':
        this.router.navigate(['/my-routines']);
        break;
      case 'alimentacion':
        this.router.navigate(['/nutrition']);
        break;
      case 'estadisticas':
        this.router.navigate(['/statistics']);
        break;
      case 'escaner':
        this.router.navigate(['/scanner']);
        break;
      case 'perfil':
        this.router.navigate(['/profile']);
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