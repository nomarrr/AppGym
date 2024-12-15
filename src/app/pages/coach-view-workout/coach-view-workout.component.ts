import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { WorkoutContentComponent } from '../../mircro-components/workout-content/workout-content.component';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-coach-view-workout',
  standalone: true,
  imports: [
    CommonModule,
    CoachSidebarComponent,
    WorkoutContentComponent
  ],
  templateUrl: './coach-view-workout.component.html',
  styleUrl: './coach-view-workout.component.css'
})
export class CoachViewWorkoutComponent implements OnInit {
  workoutId: number = 0;
  exercises: any[] = [];
  totalSets: number = 0;
  totalExercises: number = 0;
  workoutName: string = '';
  workoutDuration: string = '';
  workoutVolume: number = 0;
  workoutDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workoutId = +params['id'];
      if (this.workoutId) {
        this.loadWorkout();
      }
    });
  }

  private loadWorkout() {
    this.workoutService.getWorkout(this.workoutId).subscribe({
      next: (workout) => {
        this.workoutName = workout.name;
        this.exercises = workout.exercises;
        this.workoutDuration = workout.time;
        this.workoutVolume = workout.total_volume;
        this.workoutDate = workout.date;
        this.updateTotals();
      },
      error: (error) => {
        console.error('Error cargando workout:', error);
      }
    });
  }

  private updateTotals() {
    this.totalExercises = this.exercises.length;
    this.totalSets = this.exercises.reduce((total, exercise) => total + exercise.sets, 0);
  }
}
