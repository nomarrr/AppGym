import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {
  @Input() clientName: string = '';
  @Input() clientId: number = 0;
  @Input() imageUrl: string = '';
  @Input() option: number = 1; // 1: Cliente normal, 2: Coach

  constructor(private router: Router) {}

  viewClient() {
    if (this.option === 2) {
      // Si es coach, navega al perfil de admin
      this.router.navigate(['/admin-view-profile', this.clientId]);
    } else {
      // Si es cliente, navega al perfil de cliente
      this.router.navigate(['/admin-view-profile', this.clientId]);
    }
  }
}
