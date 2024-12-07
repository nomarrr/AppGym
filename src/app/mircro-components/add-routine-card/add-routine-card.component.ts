import { Component, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-add-routine-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './add-routine-card.component.html',
  styleUrl: './add-routine-card.component.css'
})
export class AddRoutineCardComponent {
  @Input() routineName: string ='Rutina 1';
}
