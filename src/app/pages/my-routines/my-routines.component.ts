import { Component } from '@angular/core';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineListComponent } from '../../mircro-components/routine-list/routine-list.component';
import { GymStatusComponent } from '../../mircro-components/gym-status/gym-status.component';

@Component({
  selector: 'app-my-routines',
  standalone: true,
  imports: [SidebarComponent, RoutineListComponent, GymStatusComponent],
  templateUrl: './my-routines.component.html',
  styleUrl: './my-routines.component.css'
})
export class MyRoutinesComponent {

}
