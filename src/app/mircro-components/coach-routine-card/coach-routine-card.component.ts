import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';
import { Router } from '@angular/router';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-coach-routine-card',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './coach-routine-card.component.html',
  styleUrl: './coach-routine-card.component.css'
})
export class CoachRoutineCardComponent {
  @Input() routineName: string = '';
  @Input() routineId: number = 0;
  @Output() routineDeleted = new EventEmitter<number>();

  constructor(
    private router: Router,
    private routineService: RoutineService
  ) {}

  editRoutine() {
    console.log('Editando rutina con ID:', this.routineId);
    if (this.routineId) {
      this.router.navigate(['/edit-routine', this.routineId]);
    } else {
      console.error('No se proporcionó ID de rutina');
    }
  }

  deleteRoutine() {
    if (confirm(`¿Estás seguro de que deseas eliminar la rutina "${this.routineName}"?`)) {
      if (this.routineId) {
        this.routineService.deleteRoutine(this.routineId).subscribe({
          next: (response) => {
            console.log('Rutina eliminada exitosamente:', response);
            this.routineDeleted.emit(this.routineId);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar la rutina:', error);
            alert('Error al eliminar la rutina. Por favor, intenta de nuevo.');
          }
        });
      } else {
        console.error('No se proporcionó ID de rutina');
      }
    }
  }
}
