import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { AddRoutineCardComponent } from '../../mircro-components/add-routine-card/add-routine-card.component';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-assign-existent-routine-client',
  standalone: true,
  imports: [CommonModule, CoachSidebarComponent, AddRoutineCardComponent],
  templateUrl: './assign-existent-routine-client.component.html',
  styleUrl: './assign-existent-routine-client.component.css'
})
export class AssignExistentRoutineClientComponent implements OnInit {
  clientName: string = '';
  routines: any[] = [];
  clientId: number = 0;

  constructor(
    private routineService: RoutineService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('Componente inicializado');
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      console.log('ID del cliente:', this.clientId);
      this.loadRoutines();
    });
  }

  loadRoutines() {
    console.log('Cargando rutinas...');
    this.routineService.getCoachRoutines().subscribe({
      next: (routines) => {
        console.log('Rutinas recibidas:', routines);
        this.routines = routines;
      },
      error: (error) => {
        console.error('Error al cargar rutinas:', error);
      }
    });
  }
}
