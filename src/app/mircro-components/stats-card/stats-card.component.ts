import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { StatsStateService } from '../../services/stats-state.service';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
})
export class StatsCardComponent {
  @Input() statName: string = 'Volumen general';
  @Input() type: 'client' | 'membership' = 'client';
  @Output() cardClick = new EventEmitter<string>();

  constructor(
    private router: Router,
    private statsStateService: StatsStateService
  ) {}

  onCardClick() {
    this.statsStateService.setSelectedStat(this.statName);
    if (this.type === 'client') {
      this.router.navigate(['/stats']);
    }
    this.cardClick.emit(this.statName);
  }
}
