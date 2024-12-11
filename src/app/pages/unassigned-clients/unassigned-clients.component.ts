import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { ClientCardComponent } from '../../mircro-components/client-card/client-card.component';
import { CoachService } from '../../services/coach.service';

interface UnassignedClient {
  id: number;
  name: string;
  bio: string;
  workouts: number;
  image_url: string;
}

@Component({
  selector: 'app-unassigned-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, CoachSidebarComponent, ClientCardComponent],
  templateUrl: './unassigned-clients.component.html',
  styleUrl: './unassigned-clients.component.css'
})
export class UnassignedClientsComponent implements OnInit {
  clients: UnassignedClient[] = [];
  filteredClients: UnassignedClient[] = [];
  searchTerm: string = '';

  constructor(private coachService: CoachService) {}

  ngOnInit() {
    this.loadUnassignedClients();
  }

  loadUnassignedClients() {
    this.coachService.getUnassignedClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.filteredClients = clients;
      },
      error: (error) => {
        console.error('Error al cargar clientes sin asignar:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredClients = this.clients;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredClients = this.clients.filter(client => 
      client.name.toLowerCase().includes(searchTermLower)
    );
  }
}
