import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from '../interfaces/exercise.interface';
import { MuscularGroup } from '../interfaces/muscular-group.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseStateService {
  private exerciseData = new BehaviorSubject<Partial<Exercise>>({});
  private selectedMuscularGroup = new BehaviorSubject<MuscularGroup | null>(null);

  currentExercise$ = this.exerciseData.asObservable();
  currentMuscularGroup$ = this.selectedMuscularGroup.asObservable();

  updateExerciseData(data: Partial<Exercise>) {
    this.exerciseData.next({ ...this.exerciseData.value, ...data });
  }

  updateSelectedMuscularGroup(group: MuscularGroup) {
    this.selectedMuscularGroup.next(group);
  }

  getExerciseData(): Partial<Exercise> {
    return this.exerciseData.value;
  }

  getSelectedMuscularGroup(): MuscularGroup | null {
    return this.selectedMuscularGroup.value;
  }

  clearExerciseData() {
    this.exerciseData.next({});
    this.selectedMuscularGroup.next(null);
  }
} 