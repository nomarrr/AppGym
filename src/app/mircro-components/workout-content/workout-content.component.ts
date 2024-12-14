import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWorkoutHeaderComponent } from '../admin-workout-header/admin-workout-header.component';
import { AdminRoutineNameComponent } from '../admin-routine-name/admin-routine-name.component';
import { WorkoutExerciseCardComponent } from '../workout-exercise-card/workout-exercise-card.component';

@Component({
  selector: 'app-workout-content',
  standalone: true,
  imports: [
    CommonModule,
    AdminWorkoutHeaderComponent,
    AdminRoutineNameComponent,
    WorkoutExerciseCardComponent
  ],
  templateUrl: './workout-content.component.html',
  styleUrl: './workout-content.component.css'
})
export class WorkoutContentComponent {
  @Input() totalExercises: number = 0;
  @Input() totalSets: number = 0;
  @Input() workoutDuration: string = '';
  @Input() workoutVolume: number = 0;
  @Input() workoutDate: string = '';
  @Input() workoutName: string = '';
  @Input() exercises: any[] = [];
} 