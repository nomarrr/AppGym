import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-coach-client-card',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './coach-client-card.component.html',
  styleUrl: './coach-client-card.component.css'
})
export class CoachClientCardComponent {
  @Input() clientName: string = 'Cliente 1';
  @Input() clientId: number = 0;
  @Input() imageUrl: string = 'img/User.png';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  viewClient() {
    this.router.navigate(['/admin-view-profile', this.clientId]);
  }

  promoteToCoach() {
    this.userService.promoteToCoach(this.clientId).subscribe({
      next: (response) => {
        console.log('Usuario promovido a coach exitosamente');
        this.router.navigate(['/admin-dashboard']);
      },
      error: (error) => {
        console.error('Error al promover usuario:', error);
      }
    });
  }
}
