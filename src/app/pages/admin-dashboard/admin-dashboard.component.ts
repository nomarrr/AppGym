import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientCardComponent } from '../../mircro-components/client-card/client-card.component';
import { AdminSidebarComponent } from '../../mircro-components/admin-sidebar/admin-sidebar.component';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { AdminService } from '../../services/admin.service';

interface Coach {
  id: number;
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, ClientCardComponent, BtnComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  coaches: Coach[] = [];
  
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCoaches();
  }

  private loadCoaches() {
    this.adminService.getCoaches().subscribe({
      next: (coaches) => {
        this.coaches = coaches;
        console.log('Coaches cargados:', coaches);
      },
      error: (error) => {
        console.error('Error al cargar coaches:', error);
      }
    });
  }

  get totalCoaches(): number {
    return this.coaches.length;
  }

  navigateToNewCoach() {
    this.router.navigate(['/add-coach']);
  }
}
