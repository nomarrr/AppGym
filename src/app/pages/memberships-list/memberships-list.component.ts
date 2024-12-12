import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MembershipCardComponent } from '../../mircro-components/membership-card/membership-card.component';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { AdminService } from '../../services/admin.service';

interface Membership {
  id: number;
  membership_name: string;
  price: number;
  days: number;
  active: boolean;
}

@Component({
  selector: 'app-memberships-list',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, MembershipCardComponent, BtnComponent],
  templateUrl: './memberships-list.component.html',
  styleUrl: './memberships-list.component.css'
})
export class MembershipsListComponent implements OnInit {
  memberships: Membership[] = [];
  
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMemberships();
  }

  private loadMemberships() {
    this.adminService.getMemberships().subscribe({
      next: (memberships) => {
        this.memberships = memberships;
        console.log('Membresías cargadas:', memberships);
      },
      error: (error) => {
        console.error('Error al cargar membresías:', error);
      }
    });
  }

  get totalMemberships(): number {
    return this.memberships.length;
  }

  addMembership() {
    this.router.navigate(['/add-membership']);
  }
}
