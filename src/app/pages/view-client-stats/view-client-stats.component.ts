import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { GeneralVolumeComponent } from '../../mircro-components/general-volume/general-volume.component';
import { MuscleGroupVolumeComponent } from '../../mircro-components/muscle-group-volume/muscle-group-volume.component';
import { MuscleGroupSetsComponent } from '../../mircro-components/muscle-group-sets/muscle-group-sets.component';
import { UserWeightComponent } from '../../mircro-components/user-weight/user-weight.component';
import { StatsStateService } from '../../services/stats-state.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-view-client-stats',
  standalone: true,
  imports: [
    CommonModule,
    CoachSidebarComponent,
    GeneralVolumeComponent,
    MuscleGroupVolumeComponent,
    MuscleGroupSetsComponent,
    UserWeightComponent
  ],
  templateUrl: './view-client-stats.component.html',
  styleUrls: ['./view-client-stats.component.css'] // Asegúrate de usar `styleUrls`
})
export class ViewClientStatsComponent implements OnInit {
  clientName: string = 'Cliente Desconocido';
  clientId: number = 0;
  selectedStat: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statsStateService: StatsStateService,
    private http: HttpClient,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    // Obtener el parámetro de la ruta
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];

      // Intentar obtener el nombre del cliente del estado de navegación
      const navigation = this.router.getCurrentNavigation();
      this.clientName = navigation?.extras.state?.['clientName'] || 'Cliente Desconocido';

      // Si el nombre no está disponible, cargarlo desde el servicio
      if (!navigation?.extras.state?.['clientName']) {
        this.loadClientName();
      }
    });

    // Escuchar cambios en el estado de estadísticas
    this.statsStateService.selectedStat$.subscribe(stat => {
      this.selectedStat = stat;
    });
  }

  verEstadisticas() {
    console.log('Ver estadísticas del cliente:', this.clientId);
    this.router.navigate(['/coach-client-stats', this.clientId], {
      state: { clientName: this.clientName }
    });
  }

  loadClientName() {
    this.clientService.getClientName(this.clientId).subscribe({
      next: (name) => this.clientName = name,
      error: () => this.clientName = 'Cliente Desconocido'
    });
  }

  onStatSelected(statName: string) {
    this.router.navigate(['/view-client-stats', this.clientId], {
      state: { clientName: this.clientName, selectedStat: statName }
    });
  }
}
