import { Component } from '@angular/core';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { RecipeCardComponent } from '../../mircro-components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [SidebarComponent, RecipeCardComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

}
