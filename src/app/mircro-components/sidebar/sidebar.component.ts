import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  activeItem: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveItem(this.router.url);
    });

    this.updateActiveItem(this.router.url);
  }

  updateActiveItem(url: string) {
    if (url.includes('my-routines')) {
      this.activeItem = 'entrenamiento';
    } else if (url.includes('nutrition')) {
      this.activeItem = 'alimentacion';
    } else if (url.includes('client-stats')) {
      this.activeItem = 'estadisticas';
    } else if (url.includes('scanner')) {
      this.activeItem = 'escaner';
    } else if (url.includes('profile')) {
      this.activeItem = 'perfil';
    }
  }

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    
    switch(itemId) {
      case 'entrenamiento':
        this.router.navigate(['/my-routines']);
        break;
      case 'alimentacion':
        this.router.navigate(['/nutrition']);
        break;
      case 'estadisticas':
        this.router.navigate(['/client-stats']);
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
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}