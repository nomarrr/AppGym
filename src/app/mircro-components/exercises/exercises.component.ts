import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseCard2Component } from '../exercise-card2/exercise-card2.component';
import { ExerciseService } from '../../services/exercise.service';

interface Exercise {
  id: number;
  name: string;
  description: string;
  muscle_group_id: number;
  image_url: string;
}

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExerciseCard2Component],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent implements OnInit {
  @Input() muscleGroup: string = 'Pecho';
  @Input() muscleGroupId: number = 1;
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

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
}
