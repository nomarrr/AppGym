import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectExerciseCard2Component } from '../select-exercise-card2/select-exercise-card2.component';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../interfaces/exercise.interface';
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule, SelectExerciseCard2Component],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit {
  @Input() muscleGroup: string = 'Pecho';
  @Input() muscleGroupId: number = 1;
  @Input() routineId: number = 0;
  @Input() mode: string = 'edit';
  @Output() exerciseAdded = new EventEmitter<Exercise>();
  
  exercises: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private routineService: RoutineService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.muscleGroupId) {
      this.loadExercises();
    }
  }

  loadExercises() {
    this.exerciseService.getExercisesByMuscleGroup(this.muscleGroupId)
      .subscribe({
        next: (exercises) => {
          console.log('Ejercicios cargados:', exercises);
          this.exercises = exercises;
        },
        error: (error) => {
          console.error('Error cargando ejercicios:', error);
        }
      });
  }

  onAddExercise(exercise: Exercise) {
    this.exerciseAdded.emit(exercise);
  }
}
