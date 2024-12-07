import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-select-exercise-card2',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './select-exercise-card2.component.html',
  styleUrl: './select-exercise-card2.component.css'
})
export class SelectExerciseCard2Component {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
  @Output() add = new EventEmitter<void>();

  onAdd() {
    this.add.emit();
  }
}
