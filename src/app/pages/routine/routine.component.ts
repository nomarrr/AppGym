import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineHeaderComponent } from '../../mircro-components/routine-header/routine-header.component';
import { ExerciseCardComponent } from '../../mircro-components/exercise-card/exercise-card.component';
import { RoutineService } from '../../services/routine.service';

interface SetData {
  weight: number;
  reps: number;
  date: string;
}

interface ExerciseData {
  id: number;
  sets: number;
  sets_data: SetData[];
}

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
  exercisesData: { [key: number]: ExerciseData } = {};
  totalVolume: number = 0;
  completedSets: number = 0;
  routineId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        console.log('Exercises loaded:', exercises);
      },
      error: (error) => {
        console.error('Error loading exercises:', error);
      }
    });
  }

  onSetCompleted(event: { exerciseId: number, setNumber: number, weight: number, reps: number }) {
    if (!this.exercisesData[event.exerciseId]) {
      this.exercisesData[event.exerciseId] = {
        id: event.exerciseId,
        sets: 0,
        sets_data: []
      };
    }

    this.exercisesData[event.exerciseId].sets_data[event.setNumber - 1] = {
      weight: event.weight,
      reps: event.reps,
      date: new Date().toISOString()
    };

    console.log('Set completado:', this.exercisesData);
  }

  onVolumenChange(volumeDifference: number) {
    this.totalVolume += volumeDifference;
    console.log('Nuevo volumen total:', this.totalVolume);
  }

  onFinishWorkout() {
    const currentDate = new Date().toISOString();
    const userId = parseInt(localStorage.getItem('userId') || '0');

    const workout = {
      workout: {
        name: `Workout ${currentDate}`,
        user_id: userId,
        routine_id: this.routineId,
        date: currentDate
      },
      workout_exercises: this.exercises.map((exercise) => {
        const exerciseData = this.exercisesData[exercise.id] || {
          sets_data: []
        };
        
        return {
          exercise_id: exercise.id,
          sets: exercise.sets,
          position: exercise.position,
          sets_data: exerciseData.sets_data.filter(set => set !== undefined)
        };
      })
    };

    console.log('Enviando workout data:', workout);

    this.routineService.saveWorkout(workout).subscribe({
      next: (response) => {
        console.log('Workout guardado exitosamente:', response);
        alert('¡Entrenamiento completado con éxito!');
        this.router.navigate(['/my-routines']);
      },
      error: (error) => {
        console.error('Error al guardar el workout:', error);
        alert('Error al guardar el entrenamiento. Por favor, intenta de nuevo.');
      }
    });
  }
}
