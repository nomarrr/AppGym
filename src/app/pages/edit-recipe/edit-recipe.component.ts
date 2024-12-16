import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule, BtnComponent, CoachSidebarComponent],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    image_url: ''
  };
  
  previewUrl: string | null = null;
  fileName: string = '';
  isLoading: boolean = false;
  selectedFile: File | null = null;
  recipeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.recipeId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRecipe();
  }

  loadRecipe() {
    this.recipeService.getRecipe(this.recipeId).subscribe({
      next: (data) => {
        this.recipe = data;
        this.previewUrl = this.recipe.image_url;
      },
      error: (error) => {
        console.error('Error al cargar la receta:', error);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateRecipe() {
    if (!this.recipe.name || !this.recipe.description) {
      console.error('Nombre y descripción son requeridos.');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.recipe.name);
    formData.append('description', this.recipe.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.recipeService.updateRecipe(this.recipeId, formData).subscribe({
      next: (response) => {
        console.log('Receta actualizada exitosamente:', response);
        this.isLoading = false;
        this.router.navigate(['/coach-recipes']); // O la ruta que prefieras
      },
      error: (error) => {
        console.error('Error al actualizar la receta:', error);
        this.isLoading = false;
      }
    });
  }
}
