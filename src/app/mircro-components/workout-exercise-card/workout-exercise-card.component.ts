import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-workout-exercise-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-exercise-card.component.html',
  styleUrl: './workout-exercise-card.component.css'
})
export class WorkoutExerciseCardComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() exerciseName: string = '';
  @Input() numberOfSets: number = 0;
  @Input() exerciseId: number = 0;
  @Input() position: number = 0;
  @Input() exerciseSets: any[] = [];

  exerciseForm: FormGroup;
  series: { index: number; form: FormGroup }[] = [];

  constructor(private fb: FormBuilder) {
    this.exerciseForm = this.fb.group({});
  }

  ngOnInit() {
    if (this.exerciseSets && this.exerciseSets.length > 0) {
      this.exerciseSets.forEach(set => {
        const serieForm = this.fb.group({
          kg: [{value: set.weight, disabled: true}],
          reps: [{value: set.reps, disabled: true}],
          completed: [false]
        });
        
        this.series.push({
          index: set.set_number,
          form: serieForm
        });
      });
    }
  }
} 