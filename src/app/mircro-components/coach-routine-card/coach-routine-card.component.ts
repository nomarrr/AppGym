import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-coach-routine-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './coach-routine-card.component.html',
  styleUrl: './coach-routine-card.component.css'
})
export class CoachRoutineCardComponent {
  @Input() routineName: string = '';
  @Input() routineId: number = 0;
  @Input() isClientView: boolean = false;
  clientId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routineService: RoutineService
  ) {
    // Obtener el ID del cliente de la URL
    const urlParts = window.location.pathname.split('/');
    this.clientId = parseInt(urlParts[urlParts.length - 1]);
  }

  editRoutine() {
    if (this.routineId) {
      window.location.href = `/edit-routine/${this.routineId}`;
    } else {
      console.error('No se proporcionó ID de rutina');
    }
  }

  deleteRoutine() {
    if (this.isClientView) {
      if (confirm(`¿Estás seguro de que deseas desasignar la rutina "${this.routineName}"?`)) {
        this.routineService.unassignRoutine(this.clientId, this.routineId).subscribe({
          next: (response) => {
            console.log('Rutina desasignada exitosamente:', response);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al desasignar la rutina:', error);
            if (error.status === 403) {
              alert('No tienes permiso para desasignar esta rutina.');
            } else if (error.status === 404) {
              alert('La rutina o el cliente no fueron encontrados.');
            } else {
              alert('Error al desasignar la rutina. Por favor, intenta de nuevo.');
            }
          }
        });
      }
    } else {
      // Lógica original de eliminar rutina
      if (confirm(`¿Estás seguro de que deseas eliminar la rutina "${this.routineName}"?`)) {
        if (this.routineId) {
          this.routineService.deleteRoutine(this.routineId).subscribe({
            next: (response) => {
              console.log('Rutina eliminada exitosamente:', response);
              window.location.reload();
            },
            error: (error) => {
              console.error('Error al eliminar la rutina:', error);
              alert('Error al eliminar la rutina. Por favor, intenta de nuevo.');
            }
          });
        }
      }
    }
  }
}
