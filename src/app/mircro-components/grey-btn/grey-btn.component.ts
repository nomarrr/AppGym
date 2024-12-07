import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grey-btn',
  standalone: true,
  imports: [],
  templateUrl: './grey-btn.component.html',
  styleUrl: './grey-btn.component.css'
})
export class GreyBtnComponent {
  @Input() buttonText: string = '';
  @Input() imgSrc: string = '';
  @Input() buttonWidth: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
