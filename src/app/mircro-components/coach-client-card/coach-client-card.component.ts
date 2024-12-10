import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-coach-client-card',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './coach-client-card.component.html',
  styleUrl: './coach-client-card.component.css'
})
export class CoachClientCardComponent {
  @Input() clientName: string = 'Cliente 1';
  @Input() clientId: number = 0;
  @Input() imageUrl: string = 'img/User.png';

  viewClient(){

  }
}
