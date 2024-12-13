import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { MembershipStatsListComponent } from '../../mircro-components/membership-stats-list/membership-stats-list.component';
import { MembershipPaymentStatsComponent } from '../../mircro-components/membership-payment-stats/membership-payment-stats.component';
import { MembershipOnlinePaymentStatsComponent } from '../../mircro-components/membership-online-payment-stats/membership-online-payment-stats.component';
import { MembershipAllPaymentStatsComponent } from '../../mircro-components/membership-all-payment-stats/membership-all-payment-stats.component';
import { StatsStateService } from '../../services/stats-state.service';

@Component({
  selector: 'app-membership-stats',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    MembershipStatsListComponent,
    MembershipPaymentStatsComponent,
    MembershipOnlinePaymentStatsComponent,
    MembershipAllPaymentStatsComponent
  ],
  templateUrl: './membership-stats.component.html',
  styleUrl: './membership-stats.component.css'
})
export class MembershipStatsComponent {
  selectedStat: string = '';

  constructor(private statsStateService: StatsStateService) {}

  ngOnInit() {
    this.selectedStat = this.statsStateService.getSelectedStat();
    this.statsStateService.selectedStat$.subscribe(stat => {
      this.selectedStat = stat;
    });
  }
}
