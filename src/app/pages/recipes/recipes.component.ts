import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../mircro-components/sidebar/sidebar.component';
import { ClientRecipeCardComponent } from '../../mircro-components/client-recipe-card/client-recipe-card.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ClientRecipeCardComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (error) => {
        console.error('Error al cargar las recetas:', error);
      }
    });
  }
}
