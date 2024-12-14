// src/app/mircro-components/routine-card/routine-card.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { WorkoutProgressService } from '../../services/workout-progress.service';
import { RoutineService } from '../../services/routine.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-routine-card',
  standalone: true,
  imports: [BtnComponent],
  template: `
    <div class="routine">
      <label>{{routineName}}</label>
      <app-btn buttonText="Empezar" 
               [buttonWidth]="'100%'" 
               [buttonFontSize]="'16px'"
               (click)="onStartRoutine()">
      </app-btn>
    </div>
  `,
  styleUrls: ['./routine-card.component.css']
})
export class RoutineCardComponent {
  @Input() routineName: string = '';
  @Input() routineId: number = 0;

  constructor(
    private router: Router,
    private workoutProgressService: WorkoutProgressService,
    private routineService: RoutineService
  ) {}

  onStartRoutine() {
    console.log('Starting routine with ID:', this.routineId);

    // Verificar si hay una rutina en progreso
    this.workoutProgressService.getActiveWorkout().pipe(take(1)).subscribe(activeWorkout => {
      if (activeWorkout) {
        const confirmation = confirm('Ya hay una rutina en progreso. ¿Deseas descartarla y comenzar una nueva?');
        if (!confirmation) {
          return; // Si el usuario cancela, no hacer nada
        }
      }

      // Cargar los ejercicios de la nueva rutina
      this.routineService.getRoutineExercises(this.routineId).subscribe({
        next: (exercises) => {
          // Iniciar la nueva rutina en progreso
          this.workoutProgressService.startWorkout(this.routineId, this.routineName, exercises);
          // Redirigir a la página de rutina en progreso
          this.router.navigate(['/in-progress-routine']);
        },
        error: (error) => {
          console.error('Error al cargar los ejercicios de la rutina:', error);
          alert('Error al iniciar la rutina. Por favor, intenta de nuevo.');
        }
      });
    });
  }
}