import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit {
  activeItem: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveItem(this.router.url);
    });

    // Establecer el item activo inicial
    this.updateActiveItem(this.router.url);
  }

  updateActiveItem(url: string) {
    if (url.includes('admin-dashboard')) {
      this.activeItem = 'Coaches';
    } else if (url.includes('clients')) {
      this.activeItem = 'Clientes';
    } else if (url.includes('memberships')) {
      this.activeItem = 'Membresias';
    } else if (url.includes('membership-stats')) {
      this.activeItem = 'Estadisticas';
    }
  }

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    
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
        this.router.navigate(['/membership-stats']);
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
