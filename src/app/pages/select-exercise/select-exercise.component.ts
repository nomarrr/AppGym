import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { ExerciseListComponent } from '../../mircro-components/exercise-list/exercise-list.component';
import { MuscularGroupService } from '../../services/muscular-group.service';
import { Exercise } from '../../interfaces/exercise.interface';
import { RoutineService } from '../../services/routine.service';

interface MuscleGroup {
  id: number;
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-select-exercise',
  standalone: true,
  imports: [CommonModule, CoachSidebarComponent, ExerciseListComponent],
  templateUrl: './select-exercise.component.html',
  styleUrl: './select-exercise.component.css'
})
export class SelectExerciseComponent implements OnInit {
  muscleGroups: MuscleGroup[] = [];
  routineId: number = 0;

  constructor(
    private muscularGroupService: MuscularGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.loadMuscleGroups();
    this.route.queryParams.subscribe(params => {
      this.routineId = +params['routineId'];
      console.log('ID de rutina:', this.routineId);
    });
  }

  loadMuscleGroups() {
    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (groups) => {
        console.log('Grupos musculares cargados:', groups);
        this.muscleGroups = groups;
      },
      error: (error) => {
        console.error('Error cargando grupos musculares:', error);
      }
    });
  }

  onExerciseAdded(exercise: any) {
    const routineId = this.getRoutineIdFromUrl();
    if (routineId) {
      this.routineService.addTemporaryExercise(routineId, exercise);
      this.router.navigate(['/edit-routine', routineId]);
    }
  }

  private getRoutineIdFromUrl(): number {
    const routineId = this.route.snapshot.queryParams['routineId'];
    return parseInt(routineId, 10);
  }
}
