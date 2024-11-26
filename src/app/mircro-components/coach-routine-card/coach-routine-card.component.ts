import { Component, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-coach-routine-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './coach-routine-card.component.html',
  styleUrl: './coach-routine-card.component.css'
})
export class CoachRoutineCardComponent {
  @Input() routineName: string = 'Push';

}
