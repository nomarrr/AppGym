import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../stats-card/stats-card.component';
import { StatsStateService } from '../../services/stats-state.service';

@Component({
  selector: 'app-membership-stats-list',
  standalone: true,
  imports: [CommonModule, StatsCardComponent],
  templateUrl: './membership-stats-list.component.html',
  styleUrl: './membership-stats-list.component.css'
})
export class MembershipStatsListComponent {
  stats: string[] = [
    'Total de pagos',
    'Pagos presenciales',
    'Pagos online'
  ];

  constructor(private statsStateService: StatsStateService) {}

  onStatSelected(statName: string) {
    this.statsStateService.setSelectedStat(statName);
  }
} 