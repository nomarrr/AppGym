// src/app/services/workout-progress.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SetData {
  weight: number;
  reps: number;
  completed: boolean;
}

interface ExerciseProgress {
  id: number;
  name: string;
  imageUrl: string;
  sets: SetData[];
}

interface WorkoutProgress {
  routineId: number;
  routineName: string;
  startTime: number;
  exercises: ExerciseProgress[];
  totalVolume: number;
  completedSets: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgressService {
  private activeWorkout = new BehaviorSubject<WorkoutProgress | null>(null);
  
  startWorkout(routineId: number, routineName: string, exercises: any[]) {
    const workoutProgress: WorkoutProgress = {
      routineId,
      routineName,
      startTime: Date.now(),
      exercises: exercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        imageUrl: ex.image_url,
        sets: Array(ex.sets).fill({
          weight: 0,
          reps: 0,
          completed: false
        })
      })),
      totalVolume: 0,
      completedSets: 0
    };
    
    this.activeWorkout.next(workoutProgress);
    this.saveToLocalStorage(workoutProgress);
  }

  updateSet(exerciseId: number, setIndex: number, data: SetData) {
    const workout = this.activeWorkout.value;
    if (!workout) return;

    const exercise = workout.exercises.find(e => e.id === exerciseId);
    if (exercise) {
      exercise.sets[setIndex] = data;
      this.calculateTotals(workout);
      this.activeWorkout.next(workout);
      this.saveToLocalStorage(workout); // Guardar en localStorage después de cada actualización
    }
  }

  private calculateTotals(workout: WorkoutProgress) {
    let totalVolume = 0;
    let completedSets = 0;

    workout.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (set.completed) {
          completedSets++;
          totalVolume += set.weight * set.reps;
        }
      });
    });

    workout.totalVolume = totalVolume;
    workout.completedSets = completedSets;
  }

  getActiveWorkout() {
    return this.activeWorkout.asObservable();
  }

  private saveToLocalStorage(workout: WorkoutProgress) {
    localStorage.setItem('activeWorkout', JSON.stringify(workout));
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem('activeWorkout');
    if (saved) {
      const workout = JSON.parse(saved);
      this.activeWorkout.next(workout);
    }
  }

  clearWorkout() {
    localStorage.removeItem('activeWorkout');
    this.activeWorkout.next(null);
  }
}