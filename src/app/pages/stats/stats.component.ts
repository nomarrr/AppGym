import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { StatsListComponent } from '../../mircro-components/stats-list/stats-list.component';
import { GeneralVolumeComponent } from '../../mircro-components/general-volume/general-volume.component';
import { MuscleGroupVolumeComponent } from '../../mircro-components/muscle-group-volume/muscle-group-volume.component';
import { StatsStateService } from '../../services/stats-state.service';
import { MuscleGroupSetsComponent } from '../../mircro-components/muscle-group-sets/muscle-group-sets.component';
import { UserWeightComponent } from '../../mircro-components/user-weight/user-weight.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarComponent, 
    StatsListComponent, 
    GeneralVolumeComponent,
    MuscleGroupVolumeComponent,
    MuscleGroupSetsComponent,
    UserWeightComponent
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  @Input() clientName: string = 'Cliente 1';
  selectedStat: string = '';

  constructor(private statsStateService: StatsStateService) {}

  ngOnInit() {
    this.selectedStat = this.statsStateService.getSelectedStat();
    this.statsStateService.selectedStat$.subscribe(stat => {
      this.selectedStat = stat;
    });
  }

  onStatSelected(statName: string) {
    this.statsStateService.setSelectedStat(statName);
  }
}
