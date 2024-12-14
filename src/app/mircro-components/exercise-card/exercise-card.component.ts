// src/app/mircro-components/exercise-card/exercise-card.component.ts
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
  @Input() savedSets: { weight: number, reps: number, completed: boolean }[] = [];

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

    this.savedSets.forEach((set, i) => {
      const setForm = this.fb.group({
        kg: [set.weight, [Validators.required, Validators.min(0)]],
        reps: [set.reps, [Validators.required, Validators.min(0)]],
        completed: [{ value: set.completed, disabled: !this.isSetCompletable(set) }]
      });
      
      this.sets.push(setForm);
      this.series.push({ 
        index: i + 1, 
        form: setForm,
        uniqueId: `exercise-${this.exerciseId}-set-${i + 1}`
      });

      this.subscribeToFormChanges(setForm, i);
    });
  }

  private subscribeToFormChanges(form: FormGroup, index: number) {
    const kgControl = form.get('kg');
    const repsControl = form.get('reps');
    const completedControl = form.get('completed');

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

    kgControl?.valueChanges.subscribe(() => checkEnableCompleted());
    repsControl?.valueChanges.subscribe(() => checkEnableCompleted());

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
    
    this.subscribeToFormChanges(newSet.form, newIndex - 1);
  }

  removeSet() {
    if (this.series.length > 1) {
      this.series.pop();
      this.updateCompletedSets();
    }
  }

  moveUp() {
    console.log('Moving exercise up');
  }

  moveDown() {
    console.log('Moving exercise down');
  }

  isSetCompletable(set: { weight: number, reps: number }): boolean {
    return set.weight > 0 && set.reps > 0;
  }

  getSetStatusImage(form: FormGroup): string {
    if (!this.isSetCompletable(form.value)) {
      return 'assets/icons/unchecked-disabled.svg';
    }
    return form.get('completed')?.value ? 
      'assets/icons/checked.svg' : 
      'assets/icons/unchecked.svg';
  }

  toggleSetCompletion(serie: { form: FormGroup, index: number }) {
    const form = serie.form;
    if (this.isSetCompletable(form.value)) {
      const currentValue = form.get('completed')?.value;
      form.get('completed')?.setValue(!currentValue);
    }
  }

  getSetStatusTitle(form: FormGroup): string {
    if (!this.isSetCompletable(form.value)) {
      return 'Ingresa peso y repeticiones primero';
    }
    return form.get('completed')?.value ? 
      'Click para desmarcar set' : 
      'Click para marcar set como completado';
  }
}