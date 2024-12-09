import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-routine-header',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './routine-header.component.html',
  styleUrl: './routine-header.component.css'
})
export class RoutineHeaderComponent implements OnInit, OnDestroy {
  tiempo: number = 0;
  tiempoFormateado: string = '0s';
  cronometroActivo: boolean = false;
  intervalId: any;
  @Input() volumen: number = 0;
  @Input() series: number = 0;
  @Output() finishWorkout = new EventEmitter<void>();

  ngOnInit() {
    this.iniciarCronometro();
  }

  ngOnDestroy() {
    this.pausarCronometro();
  }

  iniciarCronometro() {
    if (!this.cronometroActivo) {
      this.cronometroActivo = true;
      this.intervalId = setInterval(() => {
        this.tiempo++;
        this.tiempoFormateado = this.obtenerTiempoFormateado();
      }, 1000);
    }
  }

  pausarCronometro() {
    this.cronometroActivo = false;
    clearInterval(this.intervalId);
  }

  reiniciarCronometro() {
    this.pausarCronometro();
    this.tiempo = 0;
  }

  // Método actualizado para formatear el tiempo en formato hh:mm:ss
  obtenerTiempoFormateado(): string {
    const horas = Math.floor(this.tiempo / 3600);
    const minutos = Math.floor((this.tiempo % 3600) / 60);
    const segundos = this.tiempo % 60;
    
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
    this.pausarCronometro();
    this.finishWorkout.emit();
  }
}
