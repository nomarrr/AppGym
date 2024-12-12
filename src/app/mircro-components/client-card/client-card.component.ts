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
  @Input() option: number = 1;

  constructor(private router: Router) {}

  viewClient() {
    this.router.navigate(['/admin-view-profile', this.clientId], {
      state: { 
        option: this.option
      }
    });
  }
}
