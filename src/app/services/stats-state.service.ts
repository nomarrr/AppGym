import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsStateService {
  private selectedStatSubject = new BehaviorSubject<string>('');
  selectedStat$ = this.selectedStatSubject.asObservable();

  setSelectedStat(statName: string) {
    this.selectedStatSubject.next(statName);
  }

  getSelectedStat() {
    return this.selectedStatSubject.value;
  }
} 