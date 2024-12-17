import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, WorkoutCardComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {
  @Input() userId: number = 16;
  
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  searchTerm: string = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    if (this.userId) {
      this.loadWorkouts();
    }
  }

  loadWorkouts() {
    this.workoutService.getUserWorkouts(this.userId).subscribe({
      next: (workouts) => {
        this.workouts = workouts;
        this.filteredWorkouts = workouts;
      },
      error: (error) => {
        console.error('Error cargando workouts:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredWorkouts = this.workouts;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredWorkouts = this.workouts.filter(workout => 
        workout.name.toLowerCase().includes(searchTermLower) ||
        workout.date.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
