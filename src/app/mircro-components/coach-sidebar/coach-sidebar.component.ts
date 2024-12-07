import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-coach-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './coach-sidebar.component.html',
  styleUrl: './coach-sidebar.component.css'
})
export class CoachSidebarComponent {
  activeItem: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    
    // Manejar la navegación según el ítem seleccionado
    switch(itemId) {
      case 'clientes':
        this.router.navigate(['/coach-dashboard']);
        break;
      case 'ejercicios':
        this.router.navigate(['/exercise-panel']);
        break;
      case 'rutinas':
        this.router.navigate(['/coach-routines']);
        break;
      case 'recetas':
        //this.router.navigate(['/recipes']);
        break;
      case 'perfil':
        //this.router.navigate(['/profile']);
        break;
      case 'logout':
        this.logout();
        break;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
