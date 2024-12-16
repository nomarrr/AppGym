import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRecipeCardComponent } from '../../mircro-components/edit-recipe-card/edit-recipe-card.component';
import { GreyBtnComponent } from '../../mircro-components/grey-btn/grey-btn.component';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-coach-my-recipe-list',
  standalone: true,
  imports: [CommonModule, EditRecipeCardComponent, GreyBtnComponent],
  templateUrl: './coach-my-recipe-list.component.html',
  styleUrl: './coach-my-recipe-list.component.css'
})
export class CoachMyRecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.log('Recetas cargadas:', recipes);
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Error cargando recetas:', error);
      }
    });
  }

  navigateToCreateRecipe() {
    this.router.navigate(['/add-recipe']);
  }
}
