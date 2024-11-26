import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-input-field',
  standalone: true,
  imports: [],
  templateUrl: './auth-input-field.component.html',
  styleUrl: './auth-input-field.component.css'
})
export class AuthInputFieldComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() inputId: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
