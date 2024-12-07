import { Component } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { EditRoutineHeaderComponent } from '../../mircro-components/edit-routine-header/edit-routine-header.component';
import { EditRoutineNameComponent } from '../../mircro-components/edit-routine-name/edit-routine-name.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';

@Component({
  selector: 'app-create-routine',
  standalone: true,
  imports: [CoachSidebarComponent, EditRoutineHeaderComponent, EditRoutineNameComponent, GreyBtnComponent],
  templateUrl: './create-routine.component.html',
  styleUrl: './create-routine.component.css'
})
export class CreateRoutineComponent {

}
