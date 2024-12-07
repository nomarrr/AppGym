import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-exercise-card',
  standalone: true, // Indica que este es un componente standalone
  imports: [ReactiveFormsModule, CommonModule, BtnComponent], // IMPORTA ReactiveFormsModule AQUÍ
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css'],
})
export class ExerciseCardComponent implements OnInit {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
  @Input() numberOfSets: number = 3;
  @Input() exerciseId: number = 0;

  exerciseForm!: FormGroup;
  series: { index: number, form: FormGroup, uniqueId: string }[] = []; // Array para manejar series con sus índices
  private completedSets: number = 0;
  @Output() volumenTotalChange = new EventEmitter<number>();
  @Output() setCompleted = new EventEmitter<boolean>();
  volumenTotal: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      sets: this.fb.array([])
    });

    // Crear las series con sus índices
    for (let i = 0; i < this.numberOfSets; i++) {
      const setForm = this.fb.group({
        kg: ['', Validators.required],
        reps: ['', Validators.required],
        completed: [false]
      });
      
      this.sets.push(setForm);
      this.series.push({ 
        index: i + 1, 
        form: setForm,
        uniqueId: `exercise-${this.exerciseId}-set-${i + 1}`
      });

      // Suscribirse a los cambios de kg, reps y completed
      this.subscribeToFormChanges(setForm);
    }

    this.updateCompletedSets();
  }

  private subscribeToFormChanges(form: FormGroup) {
    form.get('completed')?.valueChanges.subscribe((isCompleted) => {
      // Emitir el evento solo cuando cambia el estado de completed
      this.setCompleted.emit(isCompleted);
      this.updateCompletedSets();
    });

    // Suscribirse a cambios en kg y reps solo para actualizar el volumen
    const updateVolumen = () => {
      if (form.valid && form.get('completed')?.value === true) {
        this.updateCompletedSets();
      }
    };

    form.get('kg')?.valueChanges.subscribe(updateVolumen);
    form.get('reps')?.valueChanges.subscribe(updateVolumen);
  }

  get sets(): FormArray {
    return this.exerciseForm.get('sets') as FormArray;
  }

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      console.log(this.exerciseForm.value);
    }
  }

  private updateCompletedSets() {
    this.completedSets = this.series.filter(serie => 
      serie.form.get('completed')?.value === true
    ).length;

    // Recalcular el volumen total desde cero
    let nuevoVolumen = 0;
    this.series.forEach(serie => {
      if (serie.form.get('completed')?.value === true) {
        const kg = serie.form.get('kg')?.value || 0;
        const reps = serie.form.get('reps')?.value || 0;
        nuevoVolumen += kg * reps;
        console.log(`Serie ${serie.index} completada: ${kg}kg x ${reps} repeticiones`);
      }
    });
    
    console.log(`Volumen anterior: ${this.volumenTotal}kg`);
    console.log(`Nuevo volumen: ${nuevoVolumen}kg`);
    
    // Emitir la diferencia entre el nuevo volumen y el anterior
    const diferencia = nuevoVolumen - this.volumenTotal;
    this.volumenTotal = nuevoVolumen;
    this.volumenTotalChange.emit(diferencia);
  }

  addSet() {
    const newIndex = this.series.length + 1;
    const newSet = {
      index: newIndex,
      form: this.fb.group({
        kg: [''],
        reps: [''],
        completed: [false]
      }),
      uniqueId: `exercise-${this.exerciseId}-set-${newIndex}`
    };
    this.series.push(newSet);
    
    // Suscribirse a los cambios del nuevo set
    this.subscribeToFormChanges(newSet.form);
  }

  removeSet() {
    if (this.series.length > 1) {
      this.series.pop();
      this.updateCompletedSets();
    }
  }

  moveUp() {
    // Lógica para mover el ejercicio hacia arriba
    console.log('Moving exercise up');
  }

  moveDown() {
    // Lógica para mover el ejercicio hacia abajo
    console.log('Moving exercise down');
  }
}
