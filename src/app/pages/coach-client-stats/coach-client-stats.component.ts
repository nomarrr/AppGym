import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { StatsListComponent } from '../../mircro-components/stats-list/stats-list.component';

@Component({
  selector: 'app-coach-client-stats',
  standalone: true,
  imports: [CoachSidebarComponent, StatsListComponent],
  templateUrl: './coach-client-stats.component.html',
  styleUrl: './coach-client-stats.component.css'
})
export class CoachClientStatsComponent implements OnInit {
  clientName: string = '';
  clientId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.loadClientName();
    });
  }

  loadClientName() {
    this.clientService.getClientName(this.clientId).subscribe({
      next: (name) => this.clientName = name,
      error: () => this.clientName = 'Cliente Desconocido'
    });
  }

  onStatSelected(statName: string) {
    console.log(`Estadística seleccionada para el cliente ${this.clientId}: ${statName}`);
    this.router.navigate(['/view-client-stats', this.clientId], {
      state: { clientName: this.clientName, selectedStat: statName }
    });
  }
}