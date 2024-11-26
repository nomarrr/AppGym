import { Component, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {
  @Input() clientName: string = 'Cliente';
  @Input() clientImage: string = 'img/User.png';
}
