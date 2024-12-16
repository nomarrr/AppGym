import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-edit-recipe-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './edit-recipe-card.component.html',
  styleUrl: './edit-recipe-card.component.css'
})
export class EditRecipeCardComponent {
  @Input() recipeName: string = '';
  @Input() recipeId: number = 0;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  editRecipe() {
    if (this.recipeId) {
      this.router.navigate([`/edit-recipe/${this.recipeId}`]);
    } else {
      console.error('No se proporcionó ID de receta');
    }
  }

  deleteRecipe() {
    if (confirm(`¿Estás seguro de que deseas eliminar la receta "${this.recipeName}"?`)) {
      if (this.recipeId) {
        this.recipeService.deleteRecipe(this.recipeId).subscribe({
          next: (response) => {
            console.log('Receta eliminada exitosamente:', response);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar la receta:', error);
            alert('Error al eliminar la receta. Por favor, intenta de nuevo.');
          }
        });
      }
    }
  }
} 