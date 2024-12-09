import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineService } from '../../services/routine.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private routineService: RoutineService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const urlParts = window.location.pathname.split('/');
    const clientId = parseInt(urlParts[urlParts.length - 1]);
    
    if (clientId) {
      this.loadRoutines(clientId);
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
}
