import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { AdminProfileComponent } from '../../mircro-components/admin-profile/admin-profile.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-view-profile',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent, 
    AdminProfileComponent
  ],
  templateUrl: './admin-view-profile.component.html',
  styleUrl: './admin-view-profile.component.css'
})
export class AdminViewProfileComponent implements OnInit {
  clientId: number = 0;
  option: number = 1;
  clientName: string = '';
  imageUrl: string = '';
  clientBio: string = '';
  workouts: number = 0;
  membershipDays: number = 0;
  assignedClients: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      option: number;
      clientName: string;
      imageUrl: string;
    };

    if (state) {
      console.log('=== DEBUG - Estado de navegación ===');
      console.log(state);
      this.option = state.option;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.loadUserDetails();
    });
  }

  private loadUserDetails() {
    this.userService.getUserDetails(this.clientId).subscribe({
      next: (details) => {
        console.log('=== DEBUG - Respuesta del endpoint ===');
        console.log(JSON.stringify(details, null, 2));

        this.clientName = details.name;
        this.imageUrl = details.image_url;
        this.clientBio = details.bio;
        this.workouts = details.workout_count || 0;
        this.membershipDays = details.membership_days_remaining || 0;
        
        if (details.role === 'coach') {
          this.option = 2;
          this.assignedClients = details.client_count || 0;
        }

        console.log('=== DEBUG - Valores finales ===');
        console.log({
          clientName: this.clientName,
          imageUrl: this.imageUrl,
          clientBio: this.clientBio,
          workouts: this.workouts,
          membershipDays: this.membershipDays,
          option: this.option,
          role: details.role
        });
      },
      error: (error) => {
        console.error('Error al cargar detalles del usuario:', error);
      }
    });
  }
}
