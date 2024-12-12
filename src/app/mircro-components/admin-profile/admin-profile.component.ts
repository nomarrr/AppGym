import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';
import { GreyBtnComponent } from '../grey-btn/grey-btn.component';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

interface RevokeResponse {
  message: string;
}

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, BtnComponent, GreyBtnComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {
  @Input() imgSrc: string = 'img/User.png';
  @Input() clientName: string = '';
  @Input() clientBio: string = '';
  @Input() workouts: number = 0;
  @Input() option: number = 1;
  @Input() clientId: number = 0;
  @Input() membershipDays: number = 0;
  @Input() assignedClients: number = 0;
  @Input() isResponsible: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    console.log('=== DEBUG - AdminProfileComponent Inputs ===');
    console.log({
      clientName: this.clientName,
      clientBio: this.clientBio,
      option: this.option,
      membershipDays: this.membershipDays
    });
  }

  increaseMembership() {
    console.log('Navegando a add-membership-user con ID:', this.clientId);
    this.router.navigate(['/add-membership-user', this.clientId]);
  }

  demoteCoach() {
    if (confirm('¿Estás seguro de que deseas deshabilitar a este coach?')) {
      this.userService.demoteToClient(this.clientId).subscribe({
        next: (response) => {
          console.log('Coach deshabilitado exitosamente');
          // Navegar de vuelta al dashboard de admin
          this.router.navigate(['/admin-dashboard']);
        },
        error: (error) => {
          console.error('Error al deshabilitar coach:', error);
        }
      });
    }
  }

  viewRoutines() {
    this.router.navigate(['/view-coach-routines', this.clientId], {
      state: { coachName: this.clientName }
    });
  }

  revokeMembership() {
    if (confirm('¿Estás seguro de que deseas deshabilitar esta membresía?')) {
      this.userService.revokeMembership(this.clientId).subscribe({
        next: (response) => {
          console.log('Membresía deshabilitada exitosamente');
          this.location.back();
        },
        error: (error) => {
          console.error('Error al deshabilitar membresía:', error);
        }
      });
    }
  }

}
