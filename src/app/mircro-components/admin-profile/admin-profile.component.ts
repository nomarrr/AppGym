import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { GreyBtnComponent } from '../grey-btn/grey-btn.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, BtnComponent, GreyBtnComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  @Input() imgSrc: string = 'img/User.png';
  @Input() clientName: string = '';
  @Input() clientBio: string = '';
  @Input() workouts: number = 0;
  @Input() option: number = 1;
  @Input() clientId: number = 0;
  @Input() membershipDays: number = 0;
  @Input() assignedClients: number = 0;
  @Input() isResponsible: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  demoteCoach() {
    if (confirm('¿Estás seguro de que deseas deshabilitar a este coach?')) {
      this.userService.demoteToClient(this.clientId).subscribe({
        next: (response) => {
          console.log('Coach deshabilitado exitosamente');
          // Navegar de vuelta al dashboard de admin
          this.router.navigate(['/admin-dashboard']);
        },
        error: (error) => {
          console.error('Error al deshabilitar coach:', error);
        }
      });
    }
  }

  viewRoutines() {
    this.router.navigate(['/view-coach-routines', this.clientId], {
      state: { coachName: this.clientName }
    });
  }
}
