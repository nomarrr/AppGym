import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-workout-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-workout-header.component.html',
  styleUrl: './admin-workout-header.component.css'
})
export class AdminWorkoutHeaderComponent {
  @Input() totalExercises: number = 0;
  @Input() totalSets: number = 0;
  @Input() duration: string = '';
  @Input() totalVolume: number = 0;
  @Input() date: string = '';

  get formattedDate(): string {
    if (!this.date) return '';
    const date = new Date(this.date);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
} 