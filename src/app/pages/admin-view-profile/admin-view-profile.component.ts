import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  userData: any = null;
  option: number = 1;
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.loadUserDetails(this.userId);
      }
    });
  }

  private loadUserDetails(userId: number) {
    this.userService.getUserDetails(userId).subscribe({
      next: (data) => {
        this.userData = data;
        this.option = data.role === 'coach' ? 2 : 1;
      },
      error: (error) => {
        console.error('Error al cargar detalles del usuario:', error);
      }
    });
  }
}
