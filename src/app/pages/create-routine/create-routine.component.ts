import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RoutineService } from '../../services/routine.service';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { EditRoutineHeaderComponent } from '../../mircro-components/edit-routine-header/edit-routine-header.component';
import { EditRoutineNameComponent } from '../../mircro-components/edit-routine-name/edit-routine-name.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { EditExerciseCardComponent } from '../../mircro-components/edit-exercise-card/edit-exercise-card.component';

@Component({
  selector: 'app-create-routine',
  standalone: true,
  imports: [
    CommonModule,
    CoachSidebarComponent, 
    EditRoutineHeaderComponent, 
    EditRoutineNameComponent, 
    GreyBtnComponent,
    EditExerciseCardComponent
  ],
  templateUrl: './create-routine.component.html',
  styleUrl: './create-routine.component.css'
})
export class CreateRoutineComponent implements OnInit {
  exercises: any[] = [];
  totalSets: number = 0;
  totalExercises: number = 0;
  routineName: string = 'Nombre de la rutina';
  private assignToClientId?: number;
  private isAssigningToClient: boolean = false;

  constructor(
    private router: Router,
    private routineService: RoutineService,
    private location: Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.assignToClientId = navigation.extras.state['assignToClientId'];
      this.isAssigningToClient = navigation.extras.state['isAssigningToClient'];
    }
  }

  ngOnInit() {
    console.log('CreateRoutineComponent - ngOnInit');
    const savedExercises = localStorage.getItem('tempExercises');
    if (savedExercises) {
      this.exercises = JSON.parse(savedExercises);
      this.updateTotals();
      console.log('Ejercicios cargados:', this.exercises);
    }

    const savedName = localStorage.getItem('tempRoutineName');
    if (savedName) {
      this.routineName = savedName;
    }
  }

  ngOnDestroy() {
    console.log('CreateRoutineComponent - ngOnDestroy');
  }

  navigateToSelectExercise() {
    console.log('Navegando a select-exercise con ejercicios:', this.exercises);
    localStorage.setItem('tempExercises', JSON.stringify(this.exercises));
    localStorage.setItem('tempRoutineName', this.routineName);
    this.router.navigate(['/select-exercise'], {
      queryParams: { mode: 'create' }
    });
  }

  onRoutineNameChange(newName: string) {
    console.log('Cambiando nombre de rutina a:', newName);
    this.routineName = newName;
    localStorage.setItem('tempRoutineName', newName);
  }

  onSaveRoutine() {
    const payload = {
      name: this.routineName,
      exercises: this.exercises.map((exercise, index) => ({
        exercise_id: exercise.id,
        sets: exercise.sets,
        position: index + 1
      }))
    };

    console.log('Payload de la rutina nueva:', JSON.stringify(payload, null, 2));
    
    this.routineService.createRoutine(payload).subscribe({
      next: (response: any) => {
        console.log('Respuesta de crear rutina:', response);
        
        localStorage.removeItem('tempExercises');
        localStorage.removeItem('tempRoutineName');

        if (this.isAssigningToClient && this.assignToClientId && response.routine_id) {
          this.routineService.assignRoutine(this.assignToClientId, response.routine_id).subscribe({
            next: () => {
              console.log('Rutina creada y asignada exitosamente');
              this.location.back();
            },
            error: (error) => {
              console.error('Error al asignar la rutina:', error);
              alert('La rutina se creó pero no se pudo asignar al cliente');
              this.location.back();
            }
          });
        } else {
          console.log('Rutina creada exitosamente');
          this.router.navigate(['/coach-routines']);
        }
      },
      error: (error) => {
        console.error('Error al crear la rutina:', error);
        alert('Error al crear la rutina');
      }
    });
  }

  onSetsChanged(index: number, newSetsCount: number) {
    if (this.exercises[index]) {
      this.exercises[index].sets = newSetsCount;
      this.updateTotals();
      localStorage.setItem('tempExercises', JSON.stringify(this.exercises));
    }
  }

  private updateTotals() {
    this.totalExercises = this.exercises.length;
    this.totalSets = this.exercises.reduce((total, exercise) => total + (exercise.sets || 0), 0);
  }

  onPositionChanged(event: {exerciseId: number, direction: 'up' | 'down'}) {
    const currentIndex = this.exercises.findIndex(ex => ex.id === event.exerciseId);
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
    localStorage.setItem('tempExercises', JSON.stringify(this.exercises));
  }

  onExerciseDeleted(uniqueId: number) {
    this.exercises = this.exercises.filter(ex => ex.uniqueId !== uniqueId);
    this.updateTotals();
    localStorage.setItem('tempExercises', JSON.stringify(this.exercises));
    console.log(`Ejercicio con uniqueId ${uniqueId} eliminado`);
  }
}
