import { Component } from '@angular/core';
import { RoutineCardComponent } from '../routine-card/routine-card.component';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [RoutineCardComponent],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.css'
})
export class RoutineListComponent {
  //agregar logica para consultar las rutinas del usuario
}
