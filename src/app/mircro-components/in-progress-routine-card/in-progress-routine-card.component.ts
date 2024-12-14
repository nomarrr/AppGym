// src/app/mircro-components/in-progress-routine-card/in-progress-routine-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-in-progress-routine-card',
  standalone: true,
  imports: [BtnComponent],
  template: `
    <div class="routine">
      <label>{{ routineName }}</label>
      <app-btn buttonText="Reanudar" [buttonWidth]="'100%'" [buttonFontSize]="'16px'" (click)="onResume()"></app-btn>
      <app-btn buttonText="Descartar" [buttonWidth]="'100%'" [buttonFontSize]="'16px'" (click)="onDiscard()"></app-btn>
    </div>
  `,
  styleUrls: ['./in-progress-routine-card.component.css']
})
export class InProgressRoutineCardComponent {
  @Input() routineName: string = '';
  @Output() resume = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();

  onResume() {
    this.resume.emit();
  }

  onDiscard() {
    this.discard.emit();
  }
}