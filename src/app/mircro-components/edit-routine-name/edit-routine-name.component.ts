import { Component, Input } from '@angular/core';
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

  clearText() {
    this.routineName = 'Nombre de la rutina';
  }
}