import { Component, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-routine-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './routine-card.component.html',
  styleUrl: './routine-card.component.css'
})
export class RoutineCardComponent {
  @Input() routineName: string ='Push';
}
