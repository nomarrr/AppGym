import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-routine-name',
  standalone: true,
  imports: [],
  templateUrl: './edit-routine-name.component.html',
  styleUrl: './edit-routine-name.component.css'
})
export class EditRoutineNameComponent {
  @Input() routineName: string = 'Push';
}
