import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineHeaderComponent } from '../../mircro-components/routine-header/routine-header.component';
import { ExerciseCardComponent } from '../../mircro-components/exercise-card/exercise-card.component';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent, 
    RoutineHeaderComponent, 
    ExerciseCardComponent
  ],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  exercises: any[] = [];
  totalVolume: number = 0;
  completedSets: number = 0;
  routineId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routineId = +params['id'];
      console.log('Routine ID from URL:', this.routineId);
      
      if (this.routineId) {
        this.loadExercises();
      }
    });
  }

  private loadExercises() {
    this.routineService.getRoutineExercises(this.routineId).subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.completedSets = 0;
        console.log('Exercises loaded:', exercises);
      },
      error: (error) => {
        console.error('Error loading exercises:', error);
      }
    });
  }

  onVolumenChange(volumeDifference: number) {
    this.totalVolume += volumeDifference;
    console.log('Nuevo volumen total:', this.totalVolume);
  }

  onSetCompleted(completed: boolean) {
    if (completed) {
      this.completedSets++;
    } else if (this.completedSets > 0) {
      this.completedSets--;
    }
    console.log('Sets completados:', this.completedSets);
  }
}
