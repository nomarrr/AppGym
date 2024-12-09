import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineService } from '../../services/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachRoutineCardComponent } from '../coach-routine-card/coach-routine-card.component';
import { GreyBtnComponent } from '../grey-btn/grey-btn.component';

@Component({
  selector: 'app-coach-routine-list',
  standalone: true,
  imports: [CommonModule, CoachRoutineCardComponent, GreyBtnComponent],
  templateUrl: './coach-routine-list.component.html',
  styleUrl: './coach-routine-list.component.css'
})
export class CoachRoutineListComponent implements OnInit {
  routines: any[] = [];
  clientId: number = 0;

  constructor(
    private routineService: RoutineService,
    private router: Router
  ) {
    const urlParts = window.location.pathname.split('/');
    this.clientId = parseInt(urlParts[urlParts.length - 1]);
  }

  ngOnInit() {
    if (this.clientId) {
      this.loadRoutines(this.clientId);
    }
  }

  private loadRoutines(clientId: number) {
    this.routineService.getUserRoutines(clientId).subscribe({
      next: (routines) => {
        this.routines = routines;
      },
      error: (error) => {
        console.error('Error al cargar las rutinas:', error);
      }
    });
  }

  navigateToAssignRoutine() {
    this.router.navigate(['/assign-existent-routine-client', this.clientId]);
  }

  navigateToCreateRoutine() {
    this.router.navigate(['/create-routine'], {
      state: { 
        assignToClientId: this.clientId,
        isAssigningToClient: true
      }
    });
  }
}
