import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { MuscularGroup } from '../../interfaces/muscular-group.interface';

@Component({
  selector: 'app-muscular-group-card',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './muscular-group-card.component.html',
  styleUrl: './muscular-group-card.component.css'
})
export class MuscularGroupCardComponent {
  @Input() muscularGroup!: MuscularGroup;
  @Output() select = new EventEmitter<MuscularGroup>();

  onSelect() {
    console.log('Grupo seleccionado en MuscularGroupCardComponent:', this.muscularGroup);
    this.select.emit(this.muscularGroup);
  }
}
