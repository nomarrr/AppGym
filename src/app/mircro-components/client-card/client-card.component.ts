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
  @Input() viewType: 'admin' | 'coach' | 'default' = 'default';

  constructor(private router: Router) {}

  viewClient() {
    switch(this.viewType) {
      case 'coach':
        this.router.navigate(['/coach-view-client', this.clientId]);
        break;
      case 'admin':
        this.router.navigate(['/admin-view-profile', this.clientId], {
          state: { option: this.option }
        });
        break;
      default:
        this.router.navigate(['/admin-view-profile', this.clientId], {
          state: { option: this.option }
        });
    }
  }
}
