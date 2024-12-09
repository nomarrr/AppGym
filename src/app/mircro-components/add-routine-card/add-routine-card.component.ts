import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-add-routine-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './add-routine-card.component.html',
  styleUrl: './add-routine-card.component.css'
})
export class AddRoutineCardComponent {
  @Input() routineName: string = 'Rutina 1';
  @Input() routineId: number = 0;

  constructor(
    private routineService: RoutineService,
    private router: Router
  ) {}

  assignRoutine() {
    const urlParts = window.location.pathname.split('/');
    const clientId = parseInt(urlParts[urlParts.length - 1]);

    if (clientId && this.routineId) {
      this.routineService.assignRoutine(clientId, this.routineId).subscribe({
        next: () => {
          console.log('Rutina asignada exitosamente');
          this.router.navigate(['/client-routines', clientId]);
        },
        error: (error) => {
          console.error('Error al asignar rutina:', error);
          alert('Error al asignar la rutina');
        }
      });
    }
  }
}
