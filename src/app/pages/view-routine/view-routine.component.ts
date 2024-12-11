import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AdminRoutineHeaderComponent } from '../../mircro-components/admin-routine-header/admin-routine-header.component';
import { AdminRoutineNameComponent } from '../../mircro-components/admin-routine-name/admin-routine-name.component';
import { ExerciseCard3Component } from '../../mircro-components/exercise-card3/exercise-card3.component';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-view-routine',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    AdminRoutineHeaderComponent,
    AdminRoutineNameComponent,
    ExerciseCard3Component
  ],
  templateUrl: './view-routine.component.html',
  styleUrl: './view-routine.component.css'
})
export class ViewRoutineComponent implements OnInit {
  routineId: number = 0;
  exercises: any[] = [];
  totalSets: number = 0;
  totalExercises: number = 0;
  routineName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutineService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.routineName = (navigation.extras.state as any).routineName;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routineId = +params['id'];
      if (this.routineId) {
        this.loadExercises();
      }
    });
  }

  private loadExercises() {
    this.routineService.getRoutineExercises(this.routineId).subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.updateTotals();
      },
      error: (error) => {
        console.error('Error cargando ejercicios:', error);
      }
    });
  }

  private updateTotals() {
    this.totalExercises = this.exercises.length;
    this.totalSets = this.exercises.reduce((total, exercise) => total + exercise.sets, 0);
  }
}
