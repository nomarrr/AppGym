import { Component } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { CoachMyRoutineListComponent } from '../../mircro-components/coach-my-routine-list/coach-my-routine-list.component';

@Component({
  selector: 'app-coach-routines',
  standalone: true,
  imports: [CoachSidebarComponent, CoachMyRoutineListComponent],
  templateUrl: './coach-routines.component.html',
  styleUrl: './coach-routines.component.css'
})
export class CoachRoutinesComponent {

}
