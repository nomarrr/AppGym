import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.css'
})
export class BtnComponent {
  //Propiedad de entrada para definir el texto del boton
  @Input() buttonText: string = '';
  //Propiedad de entrada para definir el tama;o del boton
  @Input() buttonWidth: string = '100%';
  //Propiedad de entrada para definir el tama;o del boton
  @Input() buttonFontSize: string = '16px';
  //Evento de salida que emite cuenado se hace click en el boton
  @Input() type: string = '';
  @Input() buttonMarginBottom: string = '';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>;
  //Metodo para manejar el click y emitir el evento
  onClick(){
    this.buttonClick.emit();
  }
}
