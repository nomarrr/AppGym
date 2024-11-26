import { Component } from '@angular/core';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RoutineHeaderComponent } from '../../mircro-components/routine-header/routine-header.component';
import { ExerciseCardComponent } from '../../mircro-components/exercise-card/exercise-card.component';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [SidebarComponent, RoutineHeaderComponent, ExerciseCardComponent],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent {

}
