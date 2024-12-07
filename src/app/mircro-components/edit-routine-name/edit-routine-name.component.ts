import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-routine-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-routine-name.component.html',
  styleUrl: './edit-routine-name.component.css'
})
export class EditRoutineNameComponent {
  @Input() routineName: string = 'Nombre de la rutina';
  @Output() routineNameChange = new EventEmitter<string>();
  
  isEditing: boolean = false;
  tempName: string = '';

  startEditing() {
    this.tempName = this.routineName;
    this.isEditing = true;
  }

  onBlur() {
    if (this.tempName.trim()) {
      this.routineName = this.tempName;
      this.routineNameChange.emit(this.routineName);
    } else {
      this.tempName = this.routineName;
    }
    this.isEditing = false;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target?.dispatchEvent(new Event('blur'));
    }
  }

  clearText() {
    this.tempName = 'Nombre de la rutina';
    this.routineName = this.tempName;
    this.routineNameChange.emit(this.routineName);
  }
}