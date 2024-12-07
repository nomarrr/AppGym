import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachRoutineCardComponent } from '../coach-routine-card/coach-routine-card.component';
import { GreyBtnComponent } from '../grey-btn/grey-btn.component';
import { RoutineService } from '../../services/routine.service';
import { Router } from '@angular/router';
import { Routine } from '../../interfaces/routine.interface';

@Component({
  selector: 'app-coach-my-routine-list',
  standalone: true,
  imports: [CommonModule, CoachRoutineCardComponent, GreyBtnComponent],
  templateUrl: './coach-my-routine-list.component.html',
  styleUrl: './coach-my-routine-list.component.css'
})
export class CoachMyRoutineListComponent implements OnInit {
  routines: Routine[] = [];

  constructor(
    private routineService: RoutineService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRoutines();
  }

  loadRoutines() {
    this.routineService.getCoachRoutines().subscribe({
      next: (routines) => {
        console.log('Rutinas cargadas (datos completos):', routines);
        routines.forEach((routine: Routine) => {
          console.log('ID de rutina:', routine.id);
          console.log('Nombre de rutina:', routine.name);
        });
        this.routines = routines;
      },
      error: (error) => {
        console.error('Error cargando rutinas:', error);
      }
    });
  }

  navigateToCreateRoutine() {
    this.router.navigate(['/create-routine']);
  }
}
