import { Component } from '@angular/core';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { CoachMyRecipeListComponent } from '../../mircro-components/coach-my-recipe-list/coach-my-recipe-list.component';

@Component({
  selector: 'app-coach-recipes',
  standalone: true,
  imports: [CoachSidebarComponent, CoachMyRecipeListComponent],
  templateUrl: './coach-recipes.component.html',
  styleUrl: './coach-recipes.component.css'
})
export class CoachRecipesComponent {

}
