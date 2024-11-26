import { Component, Input } from '@angular/core';
import { ClientCardComponent } from '../../mircro-components/client-card/client-card.component';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { BtnComponent } from "../../mircro-components/btn/btn.component";

@Component({
  selector: 'app-coach-dashboard',
  standalone: true,
  imports: [CoachSidebarComponent, ClientCardComponent, BtnComponent],
  templateUrl: './coach-dashboard.component.html',
  styleUrl: './coach-dashboard.component.css'
})
export class CoachDashboardComponent {
  @Input() myClients: number = 3;
}
