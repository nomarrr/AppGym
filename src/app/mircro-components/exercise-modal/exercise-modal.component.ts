import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exercise-modal',
  standalone: true,
  templateUrl: './exercise-modal.component.html',
  styleUrls: ['./exercise-modal.component.css']
})
export class ExerciseModalComponent {
  @Input() exercise: any; // Recibe los detalles del ejercicio
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  onClose() {
    this.close.emit(); // Emite el evento para cerrar el modal
  }
}
