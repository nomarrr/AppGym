import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { MuscularGroupListComponent } from '../../mircro-components/muscular-group-list/muscular-group-list.component';
import { ExerciseStateService } from '../../services/exercise-state.service';
import { MuscularGroup } from '../../interfaces/muscular-group.interface';

@Component({
  selector: 'app-select-muscular-group',
  standalone: true,
  imports: [
    CommonModule,
    CoachSidebarComponent, 
    MuscularGroupListComponent
  ],
  templateUrl: './select-muscular-group.component.html',
  styleUrl: './select-muscular-group.component.css'
})
export class SelectMuscularGroupComponent {
  constructor(
    private router: Router,
    private exerciseState: ExerciseStateService
  ) {}

  onGroupSelected(group: MuscularGroup) {
    console.log('Grupo seleccionado en SelectMuscularGroupComponent:', group);
    if (group) {
      this.exerciseState.updateSelectedMuscularGroup(group);
      this.exerciseState.updateExerciseData({
        muscle_group_id: group.id
      });
      this.router.navigate(['/add-exercise']);
    }
  }
}
