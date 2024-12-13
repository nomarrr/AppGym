import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { CoachService } from '../../services/coach.service';

interface ClientDetail {
  id: number;
  name: string;
  bio: string;
  workouts: number;
  image_url: string;
  is_responsible: boolean;
}

@Component({
  selector: 'app-coach-view-client',
  standalone: true,
  imports: [CommonModule, CoachSidebarComponent, GreyBtnComponent, BtnComponent],
  templateUrl: './coach-view-client.component.html',
  styleUrl: './coach-view-client.component.css'
})
export class CoachViewClientComponent implements OnInit {
  imgSrc: string = 'img/User.png';
  clientName: string = '';
  clientBio: string = '';
  workouts: number = 0;
  isResponsible: boolean = false;
  clientId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coachService: CoachService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      if (this.clientId) {
        this.loadClientDetail(this.clientId);
      }
    });
  }

  private loadClientDetail(clientId: number) {
    this.coachService.getClientDetail(clientId).subscribe({
      next: (client: ClientDetail) => {
        console.log('Detalles del cliente recibidos:', client);
        this.imgSrc = client.image_url || 'img/User.png';
        this.clientName = client.name;
        this.clientBio = client.bio;
        this.workouts = client.workouts;
        this.isResponsible = client.is_responsible;
      },
      error: (error) => {
        console.error('Error cargando detalles del cliente:', error);
        // Manejar el error según los códigos de estado
        if (error.status === 403) {
          console.error('No tienes permisos para ver este cliente');
          this.router.navigate(['/coach-dashboard']);
        } else if (error.status === 404) {
          console.error('Cliente no encontrado');
          this.router.navigate(['/coach-dashboard']);
        }
      }
    });
  }

  assignClient() {
    this.coachService.assignClient(this.clientId).subscribe({
      next: (response) => {
        console.log('Cliente asignado exitosamente:', response);
        // Recargar los detalles del cliente para actualizar is_responsible
        this.loadClientDetail(this.clientId);
      },
      error: (error) => {
        console.error('Error al asignar cliente:', error);
      }
    });
  }

  verRutinas() {
    this.router.navigate(['/client-routines', this.clientId], {
      state: { clientName: this.clientName }
    });
  }

  verEstadisticas() {
    // Implementar la navegación a las estadísticas cuando esté disponible
    console.log('Ver estadísticas del cliente:', this.clientId);
  }
}
