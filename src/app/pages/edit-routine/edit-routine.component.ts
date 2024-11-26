import { Component } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { EditRoutineHeaderComponent } from '../../mircro-components/edit-routine-header/edit-routine-header.component';
import { EditRoutineNameComponent } from '../../mircro-components/edit-routine-name/edit-routine-name.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { EditExerciseCardComponent } from '../../mircro-components/edit-exercise-card/edit-exercise-card.component';

@Component({
  selector: 'app-edit-routine',
  standalone: true,
  imports: [CoachSidebarComponent, EditRoutineHeaderComponent, EditRoutineNameComponent, GreyBtnComponent, EditExerciseCardComponent],
  templateUrl: './edit-routine.component.html',
  styleUrl: './edit-routine.component.css'
})
export class EditRoutineComponent {

}
