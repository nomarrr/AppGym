import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gym-status',
  standalone: true,
  imports: [],
  templateUrl: './gym-status.component.html',
  styleUrl: './gym-status.component.css'
})
export class GymStatusComponent {
  numberOfPeople: number = 7;
  //Agregar logica para consultar y actualizar numero
}
