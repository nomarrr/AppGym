import { Component, Input } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { AddRoutineCardComponent } from '../../mircro-components/add-routine-card/add-routine-card.component';

@Component({
  selector: 'app-assign-existent-routine-client',
  standalone: true,
  imports: [CoachSidebarComponent, AddRoutineCardComponent],
  templateUrl: './assign-existent-routine-client.component.html',
  styleUrl: './assign-existent-routine-client.component.css'
})
export class AssignExistentRoutineClientComponent {
  @Input() clientName: string = 'Cliente 1';

}
