import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-routine-name',
  standalone: true,
  imports: [],
  templateUrl: './admin-routine-name.component.html',
  styleUrl: './admin-routine-name.component.css'
})
export class AdminRoutineNameComponent {
  @Input() routineName: string = '';
}
