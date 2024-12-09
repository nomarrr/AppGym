import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientCardComponent } from '../../mircro-components/client-card/client-card.component';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { CoachService } from '../../services/coach.service';

interface Client {
  id: number;
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-coach-dashboard',
  standalone: true,
  imports: [CommonModule, CoachSidebarComponent, ClientCardComponent, BtnComponent],
  templateUrl: './coach-dashboard.component.html',
  styleUrl: './coach-dashboard.component.css'
})
export class CoachDashboardComponent implements OnInit {
  clients: Client[] = [];
  
  constructor(
    private coachService: CoachService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  private loadClients() {
    this.coachService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        console.log('Clientes cargados:', clients);
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  get myClients(): number {
    return this.clients.length;
  }

  navigateToUnassignedClients() {
    this.router.navigate(['/unassigned-clients']);
  }
}
