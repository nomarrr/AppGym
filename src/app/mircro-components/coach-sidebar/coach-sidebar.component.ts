import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-coach-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './coach-sidebar.component.html',
  styleUrl: './coach-sidebar.component.css'
})
export class CoachSidebarComponent implements OnInit {
  activeItem: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveItem(this.router.url);
    });

    this.updateActiveItem(this.router.url);
  }

  updateActiveItem(url: string) {
    if (url.includes('coach-dashboard')) {
      this.activeItem = 'clientes';
    } else if (url.includes('exercise-panel')) {
      this.activeItem = 'ejercicios';
    } else if (url.includes('coach-routines')) {
      this.activeItem = 'rutinas';
    } else if (url.includes('recipes')) {
      this.activeItem = 'recetas';
    } else if (url.includes('profile')) {
      this.activeItem = 'perfil';
    }
  }

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    
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
