import { Component, Input } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { StatsListComponent } from '../../mircro-components/stats-list/stats-list.component';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';

@Component({
  selector: 'app-client-stats',
  standalone: true,
  imports: [SidebarComponent, StatsListComponent],
  templateUrl: './client-stats.component.html',
  styleUrl: './client-stats.component.css'
})
export class ClientStatsComponent {
  @Input() clientName: string = 'Cliente 1';
}
