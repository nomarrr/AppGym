import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-card2',
  standalone: true,
  imports: [],
  templateUrl: './exercise-card2.component.html',
  styleUrl: './exercise-card2.component.css'
})
export class ExerciseCard2Component {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
}
