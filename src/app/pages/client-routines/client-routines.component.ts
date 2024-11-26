import { Component, Input } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { CoachRoutineListComponent } from '../../mircro-components/coach-routine-list/coach-routine-list.component';
@Component({
  selector: 'app-client-routines',
  standalone: true,
  imports: [ CoachSidebarComponent, CoachRoutineListComponent],
  templateUrl: './client-routines.component.html',
  styleUrl: './client-routines.component.css'
})
export class ClientRoutinesComponent {
  @Input() clientName: string = 'Cliente 1';
}
