import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    image_url: ''
  };

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const recipeId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRecipe(recipeId);
  }

  loadRecipe(recipeId: number) {
    this.recipeService.getRecipe(recipeId).subscribe({
      next: (data) => {
        this.recipe = data;
      },
      error: (error) => {
        console.error('Error al cargar la receta:', error);
      }
    });
  }

  calculateHeight(text: string): string {
    const lines = text.split('\n').length;
    const lineHeight = 20; // Ajusta según el estilo
    return `${lines * lineHeight}px`;
  }
}
