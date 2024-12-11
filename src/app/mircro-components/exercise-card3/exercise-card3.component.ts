import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-exercise-card3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise-card3.component.html',
  styleUrl: './exercise-card3.component.css'
})
export class ExerciseCard3Component {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
  @Input() numberOfSets: number = 3;
  @Input() exerciseId: number = 0;
  @Input() position: number = 0;

  exerciseForm: FormGroup;
  series: { index: number; form: FormGroup }[] = [];

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario principal
    this.exerciseForm = this.fb.group({});
    
    // Inicializar series (por ejemplo, 3 series)
    for (let i = 1; i <= 3; i++) {
      const serieForm = this.fb.group({
        kg: [''],
        reps: [''],
        completed: [false]
      });
      
      this.series.push({
        index: i,
        form: serieForm
      });
    }
  }

}
