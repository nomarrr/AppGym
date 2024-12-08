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
  mode: string = 'edit';

  constructor(
    private muscularGroupService: MuscularGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.loadMuscleGroups();
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'edit';
      this.routineId = +params['routineId'];
      console.log('SelectExerciseComponent - Modo:', this.mode, 'ID de rutina:', this.routineId);
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

  onExerciseAdded(exercise: Exercise) {
    const exerciseToAdd = {
      ...exercise,
      sets: 1,
      uniqueId: Date.now()
    };

    if (this.mode === 'create') {
      let currentExercises = [];
      const savedExercises = localStorage.getItem('tempExercises');
      
      if (savedExercises) {
        try {
          currentExercises = JSON.parse(savedExercises);
        } catch (e) {
          console.error('Error al parsear ejercicios:', e);
          currentExercises = [];
        }
      }

      currentExercises.push(exerciseToAdd);
      localStorage.setItem('tempExercises', JSON.stringify(currentExercises));
      this.router.navigate(['/create-routine']);
    } else {
      if (this.routineId) {
        this.routineService.addTemporaryExercise(this.routineId, exerciseToAdd);
        this.router.navigate(['/edit-routine', this.routineId]);
      }
    }
  }
}
