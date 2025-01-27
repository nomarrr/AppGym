import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutContentComponent } from '../../mircro-components/workout-content/workout-content.component';

@Component({
  selector: 'app-client-view-workout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    WorkoutContentComponent
  ],
  templateUrl: './client-view-workout.component.html',
  styleUrl: './client-view-workout.component.css'
})
export class ClientViewWorkoutComponent implements OnInit {
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
