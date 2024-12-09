import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { CoachRoutineListComponent } from '../../mircro-components/coach-routine-list/coach-routine-list.component';
@Component({
  selector: 'app-client-routines',
  standalone: true,
  imports: [ CoachSidebarComponent, CoachRoutineListComponent],
  templateUrl: './client-routines.component.html',
  styleUrl: './client-routines.component.css'
})
export class ClientRoutinesComponent implements OnInit {
  clientName: string = '';
  clientId: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.clientName = navigation.extras.state['clientName'];
    }
    const url = this.router.url;
    this.clientId = parseInt(url.split('/')[2]);
  }

  ngOnInit() {
    // Aquí puedes agregar cualquier lógica adicional que necesites
  }
}
