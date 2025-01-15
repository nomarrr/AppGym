import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  saveRecipe(formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Custom-Header': 'valor_personalizado'
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    return this.http.post(`${this.apiUrl}/create-recipe/`, formData, { headers });
  }

  getRecipe(recipeId: number): Observable<Recipe> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Custom-Header': 'valor_personalizado'
    });


    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, { headers });
  }

  updateRecipe(recipeId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Custom-Header': 'valor_personalizado'
    });

    return this.http.put(`${this.apiUrl}/recipes/${recipeId}`, formData, { headers });
  }

  deleteRecipe(recipeId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Custom-Header': 'valor_personalizado'
    });

    return this.http.delete(`${this.apiUrl}/recipes/${recipeId}`, { headers });
  }

  getAllRecipes(): Observable<Recipe[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Custom-Header': 'valor_personalizado'
    });

    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/`, { headers });
  }
} 