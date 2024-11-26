import { Component } from '@angular/core';
import { CoachRoutineCardComponent } from '../coach-routine-card/coach-routine-card.component';
import { GreyBtnComponent } from '../grey-btn/grey-btn.component';

@Component({
  selector: 'app-coach-routine-list',
  standalone: true,
  imports: [CoachRoutineCardComponent, GreyBtnComponent],
  templateUrl: './coach-routine-list.component.html',
  styleUrl: './coach-routine-list.component.css'
})
export class CoachRoutineListComponent {

}
