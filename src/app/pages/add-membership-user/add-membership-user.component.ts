import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { AdminService } from '../../services/admin.service';

interface Membership {
  id: number;
  membership_name: string;
  price: number;
  days: number;
  active: boolean;
}

@Component({
  selector: 'app-add-membership-user',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, BtnComponent],
  templateUrl: './add-membership-user.component.html',
  styleUrl: './add-membership-user.component.css'
})
export class AddMembershipUserComponent implements OnInit {
  userId: number = 0;
  memberships: Membership[] = [];
  selectedMembership: number | null = null;
  paymentMethod: number = 1; // Fijo a efectivo

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadMemberships();
    });
  }

  loadMemberships() {
    this.adminService.getMemberships().subscribe({
      next: (memberships) => {
        // Filtrar solo las membresías activas
        this.memberships = memberships.filter(m => m.active);
      },
      error: (error) => {
        console.error('Error al cargar membresías:', error);
      }
    });
  }

  selectMembership(membershipId: number) {
    this.selectedMembership = membershipId;
  }

  saveMembershipPayment() {
    if (!this.selectedMembership) {
      console.error('Debe seleccionar una membresía');
      return;
    }

    const paymentData = {
      payment_method: this.paymentMethod
    };

    this.adminService.registerMembershipPayment(
      this.userId, 
      this.selectedMembership, 
      paymentData
    ).subscribe({
      next: (response) => {
        console.log('Pago registrado exitosamente:', response);
        this.location.back();
      },
      error: (error) => {
        console.error('Error al registrar el pago:', error);
      }
    });
  }

  cancel() {
    this.location.back();
  }
}
