import { Component, Output, EventEmitter } from '@angular/core';
import { StatsCardComponent } from '../stats-card/stats-card.component';

@Component({
  selector: 'app-stats-list',
  standalone: true,
  imports: [StatsCardComponent],
  templateUrl: './stats-list.component.html',
  styleUrl: './stats-list.component.css'
})
export class StatsListComponent {
  @Output() statSelected = new EventEmitter<string>();

  onStatSelected(statName: string) {
    this.statSelected.emit(statName);
  }
}
