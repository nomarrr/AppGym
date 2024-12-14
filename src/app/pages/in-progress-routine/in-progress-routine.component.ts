// src/app/pages/in-progress-routine/in-progress-routine.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { WorkoutProgressService } from '../../services/workout-progress.service';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineHeaderComponent } from '../../mircro-components/routine-header/routine-header.component';
import { ExerciseCardComponent } from '../../mircro-components/exercise-card/exercise-card.component';
import { RoutineService } from '../../services/routine.service';

interface WorkoutSet {
  weight: number;
  reps: number;
  completed: boolean;
}

interface Exercise {
  id: number;
  name: string;
  imageUrl: string;
  sets: WorkoutSet[];
}

interface WorkoutProgress {
  routineId: number;
  startTime: number;
  exercises: Exercise[];
  totalVolume: number;
  completedSets: number;
}

@Component({
  selector: 'app-in-progress-routine',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    RoutineHeaderComponent,
    ExerciseCardComponent
  ],
  templateUrl: './in-progress-routine.component.html',
  styleUrl: './in-progress-routine.component.css'
})
export class InProgressRoutineComponent implements OnInit, OnDestroy {
  activeWorkout$!: Observable<WorkoutProgress | null>;
  totalVolume: number = 0;
  completedSets: number = 0;
  allSetsCompleted: boolean = false;
  duration: string = '00:00:00';
  private timerInterval: any;
  private workoutSubscription!: Subscription;

  constructor(
    private workoutProgressService: WorkoutProgressService,
    private routineService: RoutineService,
    private router: Router
  ) {}

  ngOnInit() {
    this.workoutProgressService.loadFromLocalStorage();
    this.activeWorkout$ = this.workoutProgressService.getActiveWorkout();
    this.workoutSubscription = this.activeWorkout$.subscribe(workout => {
      if (!workout) {
        this.router.navigate(['/my-routines']);
      } else {
        this.totalVolume = workout.totalVolume;
        this.completedSets = workout.completedSets;
        this.allSetsCompleted = this.checkAllSetsCompleted(workout);
        this.startTimer(workout.startTime);
      }
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.workoutSubscription) {
      this.workoutSubscription.unsubscribe();
    }
  }

  startTimer(startTime: number) {
    this.timerInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      this.duration = this.formatDuration(elapsed);
    }, 1000);
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  checkAllSetsCompleted(workout: WorkoutProgress): boolean {
    return workout.exercises.every(exercise =>
      exercise.sets.every(set => set.completed)
    );
  }

  onVolumenChange(volumeDifference: number) {
    this.totalVolume += volumeDifference;
    console.log('Nuevo volumen total:', this.totalVolume);
  }

  onSetCompleted(event: { exerciseId: number, setNumber: number, weight: number, reps: number }) {
    this.workoutProgressService.updateSet(event.exerciseId, event.setNumber - 1, {
      weight: event.weight,
      reps: event.reps,
      completed: true
    });
    this.activeWorkout$.subscribe(workout => {
      if (workout) {
        this.allSetsCompleted = this.checkAllSetsCompleted(workout);
      }
    });
  }

  onFinishWorkout(duration: string) {
    this.activeWorkout$.pipe(take(1)).subscribe(workout => {
      if (!workout) return;

      const currentDate = new Date().toISOString();
      const userId = parseInt(localStorage.getItem('userId') || '0');

      const workoutData = {
        workout: {
          name: `Workout ${currentDate}`,
          user_id: userId,
          routine_id: workout.routineId,
          date: currentDate,
          duration: duration
        },
        workout_exercises: workout.exercises.map((exercise: Exercise, index: number) => ({
          exercise_id: exercise.id,
          sets: exercise.sets.length,
          position: index + 1, // Asignar la posición correcta
          sets_data: exercise.sets
            .filter((set: WorkoutSet) => set.completed)
            .map((set: WorkoutSet) => ({
              weight: set.weight,
              reps: set.reps,
              date: currentDate
            }))
        }))
      };

      this.routineService.saveWorkout(workoutData).subscribe({
        next: (response) => {
          console.log('Workout guardado exitosamente:', response);
          this.workoutProgressService.clearWorkout();
          alert('¡Entrenamiento completado con éxito!');
          this.router.navigate(['/my-routines']);
        },
        error: (error) => {
          console.error('Error al guardar el workout:', error);
          alert('Error al guardar el entrenamiento. Por favor, intenta de nuevo.');
        }
      });
    });
  }
}