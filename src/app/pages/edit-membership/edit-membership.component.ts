import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AuthInputFieldComponent } from '../../mircro-components/auth-input-field/auth-input-field.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-membership',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, AuthInputFieldComponent, BtnComponent],
  templateUrl: './edit-membership.component.html',
  styleUrl: './edit-membership.component.css'
})
export class EditMembershipComponent implements OnInit {
  membershipId: number = 0;
  membershipName: string = '';
  price: string = '';
  days: string = '';
  active: boolean = true;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.membershipId = +params['id'];
      this.loadMembership();
    });
  }

  loadMembership() {
    this.adminService.getMembershipById(this.membershipId).subscribe({
        next: (membership) => {
            console.log('Membresía cargada:', membership);
            if (membership) {
                this.membershipName = membership.membership_name;
                this.price = membership.price.toString();
                this.days = membership.days.toString();
                this.active = Boolean(membership.active);
                console.log('Estado activo:', this.active);
            }
        },
        error: (error) => {
            console.error('Error al cargar la membresía:', error);
        }
    });
  }

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

    const updatedMembership = {
        membership_name: this.membershipName,
        price: parseFloat(this.price),
        days: parseInt(this.days),
        active: this.active
    };

    console.log('Enviando al backend:', updatedMembership);

    this.adminService.updateMembership(this.membershipId, updatedMembership).subscribe({
        next: (response) => {
            console.log('Membresía actualizada exitosamente:', response);
            this.router.navigate(['/memberships']);
        },
        error: (error) => {
            console.error('Error al actualizar la membresía:', error);
        }
    });
  }

  cancel() {
    this.router.navigate(['/memberships']);
  }
}