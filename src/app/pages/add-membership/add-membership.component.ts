import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AuthInputFieldComponent } from '../../mircro-components/auth-input-field/auth-input-field.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-membership',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, AuthInputFieldComponent, BtnComponent],
  templateUrl: './add-membership.component.html',
  styleUrl: './add-membership.component.css'
})
export class AddMembershipComponent {
  membershipName: string = '';
  price: string = '';
  days: string = '';
  active: boolean = true;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  onNameChange(value: string) {
    this.membershipName = value;
  }

  onPriceChange(value: string) {
    this.price = value;
  }

  onDaysChange(value: string) {
    this.days = value;
  }

  onActiveChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.active = checkbox.checked;
  }

  saveMembership() {
    if (!this.membershipName || !this.price || !this.days) {
        console.error('Todos los campos son requeridos');
        return;
    }

    const newMembership = {
        membership_name: this.membershipName,
        price: parseFloat(this.price),
        days: parseInt(this.days),
        active: this.active
    };

    console.log('Enviando al backend:', newMembership);

    this.adminService.createMembership(newMembership).subscribe({
        next: (response) => {
            console.log('Membresía creada exitosamente:', response);
            this.router.navigate(['/memberships']);
        },
        error: (error) => {
            console.error('Error al crear la membresía:', error);
        }
    });
  }

  cancel() {
    this.router.navigate(['/memberships']);
  }
}
