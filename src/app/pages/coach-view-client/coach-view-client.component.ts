import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { CoachService } from '../../services/coach.service';

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
      next: (client) => {
        this.imgSrc = client.image_url;
        this.clientName = client.name;
        this.clientBio = client.bio;
        this.workouts = client.workouts;
        this.isResponsible = client.is_responsible;
      },
      error: (error) => {
        console.error('Error cargando detalles del cliente:', error);
      }
    });
  }

  assignClient() {
    this.coachService.assignClient(this.clientId).subscribe({
      next: (response) => {
        console.log('Cliente asignado exitosamente:', response);
        this.router.navigate(['/coach-dashboard']);
      },
      error: (error) => {
        console.error('Error al asignar cliente:', error);
        // Aquí podrías agregar un manejo de errores más específico
      }
    });
  }
}
