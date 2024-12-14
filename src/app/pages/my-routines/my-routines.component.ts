// src/app/pages/my-routines/my-routines.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineListComponent } from '../../mircro-components/routine-list/routine-list.component';
import { WorkoutListComponent } from '../../mircro-components/workout-list/workout-list.component';
import { InProgressRoutineCardComponent } from '../../mircro-components/in-progress-routine-card/in-progress-routine-card.component';
import { TokenService } from '../../services/token.service';
import { WorkoutProgressService } from '../../services/workout-progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-routines',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent, 
    RoutineListComponent, 
    WorkoutListComponent,
    InProgressRoutineCardComponent
  ],
  templateUrl: './my-routines.component.html',
  styleUrl: './my-routines.component.css'
})
export class MyRoutinesComponent implements OnInit {
  userId: number = 0;
  inProgressRoutineName: string = '';

  constructor(
    private tokenService: TokenService,
    private workoutProgressService: WorkoutProgressService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.tokenService.getUserIdFromToken();
    this.workoutProgressService.getActiveWorkout().subscribe(workout => {
      if (workout) {
        this.inProgressRoutineName = workout.routineName;
      }
    });
  }

  onResumeRoutine() {
    this.router.navigate(['/in-progress-routine']);
  }

  onDiscardRoutine() {
    const confirmation = confirm('¿Estás seguro de que deseas descartar el entrenamiento en progreso?');
    if (confirmation) {
      this.workoutProgressService.clearWorkout();
      this.inProgressRoutineName = '';
    }
  }
}