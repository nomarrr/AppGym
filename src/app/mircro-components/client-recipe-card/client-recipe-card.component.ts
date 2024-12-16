import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-client-recipe-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './client-recipe-card.component.html',
  styleUrl: './client-recipe-card.component.css'
})
export class ClientRecipeCardComponent {
  @Input() recipeName: string = '';
  @Input() recipeId: number = 0;

  constructor(private router: Router) {}

  viewRecipe() {
    this.router.navigate(['/view-recipe', this.recipeId]);
  }
}
