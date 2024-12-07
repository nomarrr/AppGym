import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineCardComponent } from '../routine-card/routine-card.component';
import { AuthService } from '../../services/auth.service';
import { RoutineService } from '../../services/routine.service';
import { Routine } from '../../interfaces/routine.interface';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [CommonModule, RoutineCardComponent],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.css'
})
export class RoutineListComponent implements OnInit {
  routines: Routine[] = [];

  constructor(
    private authService: AuthService,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    console.log('Current userId:', userId);
    
    if (userId) {
      this.loadUserRoutines(userId);
    } else {
      console.error('No user ID found');
    }
  }

  private loadUserRoutines(userId: number) {
    this.routineService.getUserRoutines(userId).subscribe({
      next: (routines) => {
        this.routines = routines;
        console.log('Rutinas cargadas:', routines);
      },
      error: (error) => {
        console.error('Error cargando rutinas:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
}
