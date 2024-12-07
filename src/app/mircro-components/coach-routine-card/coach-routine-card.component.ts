import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  editRoutine() {
    console.log('Editando rutina con ID:', this.routineId);
    if (this.routineId) {
      this.router.navigate(['/edit-routine', this.routineId]);
    } else {
      console.error('No se proporcionó ID de rutina');
    }
  }

}
