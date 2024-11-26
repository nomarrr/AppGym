import { Component, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-edit-routine-header',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './edit-routine-header.component.html',
  styleUrl: './edit-routine-header.component.css'
})
export class EditRoutineHeaderComponent {
  @Input() sets: number = 3;
  @Input() exercises: number = 1;
}
