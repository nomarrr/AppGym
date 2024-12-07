import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-edit-routine-header',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './edit-routine-header.component.html',
  styleUrl: './edit-routine-header.component.css'
})
export class EditRoutineHeaderComponent {
  @Input() totalExercises: number = 0;
  @Input() totalSets: number = 0;
  @Output() saveRoutine = new EventEmitter<void>();

  onSave() {
    this.saveRoutine.emit();
  }
}
