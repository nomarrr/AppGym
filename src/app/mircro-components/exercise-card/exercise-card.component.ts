import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BtnComponent],
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css'],
})
export class ExerciseCardComponent implements OnInit {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
  @Input() numberOfSets: number = 3;
  @Input() exerciseId: number = 0;

  exerciseForm!: FormGroup;
  series: { index: number, form: FormGroup, uniqueId: string }[] = [];
  private completedSets: number = 0;
  @Output() volumenTotalChange = new EventEmitter<number>();
  @Output() setCompleted = new EventEmitter<{
    exerciseId: number,
    setNumber: number,
    weight: number,
    reps: number
  }>();
  volumenTotal: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      sets: this.fb.array([])
    });

    for (let i = 0; i < this.numberOfSets; i++) {
      const setForm = this.fb.group({
        kg: ['', [Validators.required, Validators.min(0)]],
        reps: ['', [Validators.required, Validators.min(0)]],
        completed: [{ value: false, disabled: true }]
      });
      
      this.sets.push(setForm);
      this.series.push({ 
        index: i + 1, 
        form: setForm,
        uniqueId: `exercise-${this.exerciseId}-set-${i + 1}`
      });

      // Suscribirse a los cambios
      this.subscribeToFormChanges(setForm, i);
    }
  }

  private subscribeToFormChanges(form: FormGroup, index: number) {
    // Observar cambios en kg y reps
    const kgControl = form.get('kg');
    const repsControl = form.get('reps');
    const completedControl = form.get('completed');

    // Función para verificar si se pueden habilitar los checkboxes
    const checkEnableCompleted = () => {
      const isValid = kgControl?.valid && repsControl?.valid &&
                     kgControl?.value > 0 && repsControl?.value > 0;
      
      if (isValid) {
        completedControl?.enable();
      } else {
        completedControl?.disable();
        if (completedControl?.value) {
          completedControl?.setValue(false);
        }
      }
    };

    // Suscribirse a cambios en kg y reps
    kgControl?.valueChanges.subscribe(() => checkEnableCompleted());
    repsControl?.valueChanges.subscribe(() => checkEnableCompleted());

    // Suscribirse a cambios en completed
    completedControl?.valueChanges.subscribe((isCompleted) => {
      if (isCompleted) {
        this.setCompleted.emit({
          exerciseId: this.exerciseId,
          setNumber: index + 1,
          weight: kgControl?.value || 0,
          reps: repsControl?.value || 0
        });
      }
      this.updateCompletedSets();
    });
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
    this.subscribeToFormChanges(newSet.form, newIndex - 1);
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

  isSetCompletable(form: FormGroup): boolean {
    const kg = form.get('kg')?.value;
    const reps = form.get('reps')?.value;
    return form.valid && kg > 0 && reps > 0;
  }

  getSetStatusImage(form: FormGroup): string {
    if (!this.isSetCompletable(form)) {
      return 'assets/icons/unchecked-disabled.svg';
    }
    return form.get('completed')?.value ? 
      'assets/icons/checked.svg' : 
      'assets/icons/unchecked.svg';
  }

  toggleSetCompletion(serie: { form: FormGroup, index: number }) {
    const form = serie.form;
    if (this.isSetCompletable(form)) {
      const currentValue = form.get('completed')?.value;
      form.get('completed')?.setValue(!currentValue);
    }
  }

  getSetStatusTitle(form: FormGroup): string {
    if (!this.isSetCompletable(form)) {
      return 'Ingresa peso y repeticiones primero';
    }
    return form.get('completed')?.value ? 
      'Click para desmarcar set' : 
      'Click para marcar set como completado';
  }
}
