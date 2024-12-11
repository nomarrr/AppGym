import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-routine-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './admin-routine-card.component.html',
  styleUrl: './admin-routine-card.component.css'
})
export class AdminRoutineCardComponent {
  @Input() routineName: string = '';
  @Input() routineId: number = 0;
  @Output() routineDeleted = new EventEmitter<number>();

  constructor(
    private routineService: RoutineService,
    private router: Router
  ) {}

  viewRoutine() {
    // Implementar vista de rutina
  }

  deleteRoutine() {
    if (confirm(`¿Estás seguro de que deseas eliminar la rutina "${this.routineName}"?`)) {
      this.routineService.deleteRoutineAdmin(this.routineId).subscribe({
        next: (response) => {
          console.log('Rutina eliminada exitosamente');
          this.routineDeleted.emit(this.routineId);
        },
        error: (error) => {
          console.error('Error al eliminar la rutina:', error);
        }
      });
    }
  }
}
