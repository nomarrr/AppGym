import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-routine-card',
  standalone: true,
  imports: [BtnComponent],
  template: `
    <div class="routine">
      <label>{{routineName}}</label>
      <app-btn buttonText="Empezar" 
               [buttonWidth]="'100%'" 
               [buttonFontSize]="'16px'"
               (click)="onStartRoutine()">
      </app-btn>
    </div>
  `,
  styleUrls: ['./routine-card.component.css']
})
export class RoutineCardComponent {
  @Input() routineName: string = '';
  @Input() routineId: number = 0;

  constructor(private router: Router) {}

  onStartRoutine() {
    console.log('Starting routine with ID:', this.routineId); // Para debug
    this.router.navigate(['/routine', this.routineId]);
  }
}