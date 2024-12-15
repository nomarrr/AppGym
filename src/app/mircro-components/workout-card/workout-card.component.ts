import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';  
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../constants/roles';

@Component({
  selector: 'app-workout-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {
  @Input() workoutName: string = '';
  @Input() workoutId: number = 0;
  @Input() workoutDate: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  navigateToWorkout() {
    const userRole = this.authService.getUserRole();
    console.log('User Role:', userRole); // Verificar el rol del usuario
    console.log('User Role:', userRole); // Verificar el rol del usuario
    console.log('User Role:', userRole); // Verificar el rol del usuario
    console.log('User Role:', userRole); // Verificar el rol del usuario
    console.log('User Role:', userRole); // Verificar el rol del usuario
    if (userRole === 2) {
      this.router.navigate(['/coach-view-workout', this.workoutId]);
    } else {
      this.router.navigate(['/client-view-workout', this.workoutId]);
    }
  }

  get formattedDate(): string {
    if (!this.workoutDate) return '';
    const date = new Date(this.workoutDate);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
