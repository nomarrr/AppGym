import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { ExercisesComponent } from '../../mircro-components/exercises/exercises.component';
import { MuscularGroupService } from '../../services/muscular-group.service';

interface MuscleGroup {
  id: number;
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-exercise-panel',
  standalone: true,
  imports: [CommonModule, CoachSidebarComponent, GreyBtnComponent, ExercisesComponent],
  templateUrl: './exercise-panel.component.html',
  styleUrl: './exercise-panel.component.css'
})
export class ExercisePanelComponent implements OnInit {
  muscleGroups: MuscleGroup[] = [];

  constructor(
    private muscularGroupService: MuscularGroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMuscleGroups();
  }

  loadMuscleGroups() {
    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (groups) => {
        console.log('Grupos musculares cargados:', groups);
        this.muscleGroups = groups;
      },
      error: (error) => {
        console.error('Error cargando grupos musculares:', error);
      }
    });
  }

  navigateToAddExercise() {
    this.router.navigate(['/add-exercise']);
  }
}
