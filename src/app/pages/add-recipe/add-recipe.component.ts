import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { Recipe } from '../../interfaces/recipe.interface';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CoachSidebarComponent, 
    BtnComponent
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
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

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Inicialización si es necesario
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

  saveRecipe() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    if (!this.recipe.name || !this.recipe.description) {
      console.error('Nombre y descripción son requeridos.');
      return;
    }

    // Validar que el nombre y la descripción sean cadenas de texto válidas
    const namePattern = /^[a-zA-Z0-9\s]+$/;
    if (!namePattern.test(this.recipe.name)) {
      console.error('El nombre contiene caracteres no permitidos.');
      return;
    }


    // Validar que el archivo sea una imagen
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(this.selectedFile.type)) {
      console.error('El archivo seleccionado no es una imagen válida.');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.recipe.name);
    formData.append('description', this.recipe.description);
    formData.append('image', this.selectedFile);

    this.recipeService.saveRecipe(formData).subscribe({
      next: (response) => {
        console.log('Receta guardada exitosamente:', response);
        this.isLoading = false;
        this.router.navigate(['/coach-recipes']); // O la ruta que prefieras
      },
      error: (error) => {
        console.error('Error al guardar la receta:', error);
        this.isLoading = false;
      }
    });
  }
} 