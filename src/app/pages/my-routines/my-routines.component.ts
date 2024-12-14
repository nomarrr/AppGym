import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineListComponent } from '../../mircro-components/routine-list/routine-list.component';
import { WorkoutListComponent } from '../../mircro-components/workout-list/workout-list.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-my-routines',
  standalone: true,
  imports: [
    SidebarComponent, 
    RoutineListComponent, 
    WorkoutListComponent
  ],
  templateUrl: './my-routines.component.html',
  styleUrl: './my-routines.component.css'
})
export class MyRoutinesComponent implements OnInit {
  userId: number = 0;

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.userId = this.tokenService.getUserIdFromToken();
  }
}
