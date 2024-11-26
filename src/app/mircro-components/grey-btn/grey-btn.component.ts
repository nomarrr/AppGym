import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grey-btn',
  standalone: true,
  imports: [],
  templateUrl: './grey-btn.component.html',
  styleUrl: './grey-btn.component.css'
})
export class GreyBtnComponent {
  @Input() buttonText: string = 'Estadisticas';
  @Input() imgSrc: string = 'img/Grey-analytics.png';
  @Input() buttonWidth: string = '200px';
}
