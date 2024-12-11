import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AdminRoutineCardComponent } from '../../mircro-components/admin-routine-card/admin-routine-card.component';
import { CoachService } from '../../services/coach.service';

interface Routine {
  id: number;
  name: string;
  description: string;
  created_at: string;
  assigned_clients_count: number;
}

@Component({
  selector: 'app-view-coach-routines',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, AdminRoutineCardComponent],
  templateUrl: './view-coach-routines.component.html',
  styleUrl: './view-coach-routines.component.css'
})
export class ViewCoachRoutinesComponent implements OnInit {
  coachName: string = '';
  routines: Routine[] = [];
  coachId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private coachService: CoachService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.coachName = (navigation.extras.state as any).coachName;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.coachId = +params['id'];
      if (this.coachId) {
        this.loadCoachRoutines();
      }
    });
  }

  private loadCoachRoutines() {
    this.coachService.getCoachRoutines(this.coachId).subscribe({
      next: (routines) => {
        this.routines = routines;
      },
      error: (error) => {
        console.error('Error al cargar rutinas del coach:', error);
      }
    });
  }

  onRoutineDeleted(routineId: number) {
    this.routines = this.routines.filter(routine => routine.id !== routineId);
  }
}
