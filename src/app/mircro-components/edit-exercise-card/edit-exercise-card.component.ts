import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-edit-exercise-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BtnComponent],
  templateUrl: './edit-exercise-card.component.html',
  styleUrls: ['./edit-exercise-card.component.css'],
})
export class EditExerciseCardComponent implements OnInit {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
  @Input() numberOfSets: number = 3;
  @Input() exerciseId: number = 0;
  @Input() position: number = 0;
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  @Output() setsChanged = new EventEmitter<number>();
  @Output() positionChanged = new EventEmitter<{exerciseId: number, direction: 'up' | 'down'}>();
  @Output() exerciseDeleted = new EventEmitter<number>();

  exerciseForm!: FormGroup;
  series: { index: number, form: FormGroup }[] = [];
  private completedSets: number = 0;
  @Output() volumenTotalChange = new EventEmitter<number>();
  volumenTotal: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      sets: this.fb.array([])
    });

    // Inicializar las series con el número proporcionado
    for (let i = 0; i < this.numberOfSets; i++) {
      this.addInitialSet(i + 1);
    }

    this.updateCompletedSets();
  }

  private addInitialSet(index: number) {
    const setForm = this.fb.group({
      kg: ['', Validators.required],
      reps: ['', Validators.required],
      completed: [false]
    });
    
    this.sets.push(setForm);
    this.series.push({ 
      index: index, 
      form: setForm 
    });

    this.subscribeToFormChanges(setForm);
  }

  addSet() {
    const newIndex = this.series.length + 1;
    const newSet = {
      index: newIndex,
      form: this.fb.group({
        kg: [''],
        reps: [''],
        completed: [false]
      })
    };
    this.series.push(newSet);
    this.subscribeToFormChanges(newSet.form);
    this.numberOfSets = this.series.length; // Actualizar el número de series
    this.setsChanged.emit(this.numberOfSets);
    console.log('Series actuales:', this.numberOfSets);
  }

  removeSet() {
    if (this.series.length > 1) {
      this.series.pop();
      this.updateCompletedSets();
      this.numberOfSets = this.series.length; // Actualizar el número de series
      this.setsChanged.emit(this.numberOfSets);
      console.log('Series actuales:', this.numberOfSets);
    }
  }

  get sets(): FormArray {
    return this.exerciseForm.get('sets') as FormArray;
  }

  private subscribeToFormChanges(form: FormGroup) {
    // Suscribirse a cambios en kg
    form.get('kg')?.valueChanges.subscribe(() => {
      if (form.get('completed')?.value === true) {
        this.updateCompletedSets();
      }
    });

    // Suscribirse a cambios en reps
    form.get('reps')?.valueChanges.subscribe(() => {
      if (form.get('completed')?.value === true) {
        this.updateCompletedSets();
      }
    });

    // Suscribirse a cambios en completed
    form.get('completed')?.valueChanges.subscribe(() => {
      this.updateCompletedSets();
    });
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

    // Recalcular el volumen total
    this.volumenTotal = 0;
    this.series.forEach(serie => {
      if (serie.form.get('completed')?.value === true) {
        const kg = serie.form.get('kg')?.value || 0;
        const reps = serie.form.get('reps')?.value || 0;
        this.volumenTotal += kg * reps;
        
        console.log(`Serie ${serie.index} completada: ${kg}kg x ${reps} repeticiones`);
      }
    });
    
    console.log(`Volumen total actual: ${this.volumenTotal}kg`);
    
    // Emitir el nuevo valor
    this.volumenTotalChange.emit(this.volumenTotal);
  }

  moveUp() {
    if (!this.isFirst) {
      this.positionChanged.emit({
        exerciseId: this.exerciseId,
        direction: 'up'
      });
    }
  }

  moveDown() {
    if (!this.isLast) {
      this.positionChanged.emit({
        exerciseId: this.exerciseId,
        direction: 'down'
      });
    }
  }

  deleteExercise() {
    this.exerciseDeleted.emit(this.exerciseId);
  }
}
