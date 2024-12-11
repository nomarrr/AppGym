import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-routine-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-routine-header.component.html',
  styleUrl: './admin-routine-header.component.css'
})
export class AdminRoutineHeaderComponent {
  @Input() totalExercises: number = 0;
  @Input() totalSets: number = 0;
}
