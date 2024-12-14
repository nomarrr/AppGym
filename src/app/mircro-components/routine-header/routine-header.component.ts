// src/app/mircro-components/routine-header/routine-header.component.ts
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-routine-header',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './routine-header.component.html',
  styleUrl: './routine-header.component.css'
})
export class RoutineHeaderComponent implements OnInit, OnDestroy {
  @Input() startTime: number = 0;
  @Input() volumen: number = 0;
  @Input() series: number = 0;
  @Input() allSetsCompleted: boolean = false;
  @Output() finishWorkout = new EventEmitter<string>();

  tiempoFormateado: string = '0s';
  intervalId: any;

  ngOnInit() {
    this.iniciarCronometro();
  }

  ngOnDestroy() {
    this.pausarCronometro();
  }

  iniciarCronometro() {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - this.startTime;
      this.tiempoFormateado = this.obtenerTiempoFormateado(elapsed);
    }, 1000);
  }

  pausarCronometro() {
    clearInterval(this.intervalId);
  }

  obtenerTiempoFormateado(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const horas = Math.floor(totalSeconds / 3600);
    const minutos = Math.floor((totalSeconds % 3600) / 60);
    const segundos = totalSeconds % 60;
    
    let tiempoFormateado = '';
    
    if (horas > 0) {
      tiempoFormateado += `${horas}h `;
    }
    
    if (minutos > 0 || horas > 0) {
      tiempoFormateado += `${minutos}min `;
    }
    
    tiempoFormateado += `${segundos}s`;
    
    return tiempoFormateado;
  }

  onFinishClick() {
    if (this.allSetsCompleted) {
      this.pausarCronometro();
      this.finishWorkout.emit(this.tiempoFormateado);
    } else {
      alert('Debes completar todos los sets antes de terminar la rutina.');
    }
    //console.log('Evento boton terminar emitido');
  }
}