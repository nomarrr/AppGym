import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { EditRoutineHeaderComponent } from '../../mircro-components/edit-routine-header/edit-routine-header.component';
import { EditRoutineNameComponent } from '../../mircro-components/edit-routine-name/edit-routine-name.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { EditExerciseCardComponent } from '../../mircro-components/edit-exercise-card/edit-exercise-card.component';
import { RoutineService } from '../../services/routine.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-routine',
  standalone: true,
  imports: [
    CommonModule,
    CoachSidebarComponent, 
    EditRoutineHeaderComponent, 
    EditRoutineNameComponent, 
    GreyBtnComponent, 
    EditExerciseCardComponent
  ],
  templateUrl: './edit-routine.component.html',
  styleUrl: './edit-routine.component.css'
})
export class EditRoutineComponent implements OnInit {
  routineId: number = 0;
  exercises: any[] = [];
  totalSets: number = 0;
  totalExercises: number = 0;
  routineName: string = 'Nombre de la rutina';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routineId = +params['id'];
      console.log('ID de rutina a editar:', this.routineId);
      
      if (this.routineId) {
        this.loadRoutine();
        this.loadExercises();
      }
    });
  }

  private loadRoutine() {
    this.routineService.getRoutine(this.routineId).subscribe({
      next: (routine) => {
        console.log('Rutina cargada:', routine);
        this.routineName = routine.name;
      },
      error: (error) => {
        console.error('Error cargando rutina:', error);
      }
    });
  }

  private loadExercises() {
    this.routineService.getRoutineExercises(this.routineId).subscribe({
      next: (exercises) => {
        console.log('Ejercicios cargados:', exercises);
        this.exercises = exercises;
        this.updateTotals();
      },
      error: (error) => {
        console.error('Error cargando ejercicios:', error);
      }
    });
  }

  onSetsChanged(index: number, newSetsCount: number) {
    if (this.exercises[index]) {
      this.exercises[index].sets = newSetsCount;
      this.updateTotals();
    }
  }

  private updateTotals() {
    this.totalExercises = this.exercises.length;
    this.totalSets = this.exercises.reduce((total, exercise) => total + exercise.sets, 0);
  }

  onPositionChanged(event: {exerciseId: number, direction: 'up' | 'down'}) {
    const currentIndex = this.exercises.findIndex(ex => ex.uniqueId === event.exerciseId);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (event.direction === 'up' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (event.direction === 'down' && currentIndex < this.exercises.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return;
    }

    const tempExercises = [...this.exercises];
    [tempExercises[currentIndex], tempExercises[newIndex]] = 
    [tempExercises[newIndex], tempExercises[currentIndex]];
    
    this.exercises = tempExercises;
    this.routineService.updateExercisesOrder(this.routineId, this.exercises);
  }

  onExerciseDeleted(exerciseId: number) {
    const exercise = this.exercises.find(ex => ex.uniqueId === exerciseId);
    if (exercise) {
      this.routineService.markExerciseAsDeleted(this.routineId, exercise.id);
      this.exercises = this.exercises.filter(ex => ex.uniqueId !== exerciseId);
      this.updateTotals();
    }
    console.log(`Ejercicio con uniqueId ${exerciseId} eliminado`);
  }

  navigateToSelectExercise() {
    this.router.navigate(['/select-exercise'], {
      queryParams: { routineId: this.routineId }
    });
  }

  onRoutineNameChange(newName: string) {
    console.log('Cambiando nombre de rutina a:', newName);
    this.routineName = newName;
  }

  onSaveRoutine() {
    if (this.routineId && this.exercises.length > 0) {
      this.routineService.saveRoutineChanges(
       this.routineId, 
        this.exercises.map(exercise => ({
          ...exercise,
          exercise_id: exercise.id // Aseguramos usar el ID original para el backend
        })), 
        this.routineName
      ).pipe(
        finalize(() => {
          console.log('Finalizando operación de guardado');
          setTimeout(() => {
            this.router.navigate(['/coach-routines'])
              .then(() => console.log('Navegación exitosa'))
              .catch(err => console.error('Error en la navegación:', err));
          }, 100);
        })
      ).subscribe({
        next: (response) => {
          console.log('Rutina guardada exitosamente:', response);
        },
        error: (error) => {
          console.error('Error guardando la rutina:', error);
        }
      });
    }
  }
}
