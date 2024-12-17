import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { Exercise } from '../../interfaces/exercise.interface';
import { MuscularGroup } from '../../interfaces/muscular-group.interface';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseStateService } from '../../services/exercise-state.service';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CoachSidebarComponent, 
    BtnComponent
  ],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.css'
})
export class AddExerciseComponent implements OnInit {
  exercise: Exercise = {
    name: '',
    description: '',
    muscle_group_id: 0,
    image_url: ''
  };
  
  previewUrl: string | null = null;
  fileName: string = '';
  selectedMuscularGroup: MuscularGroup | null = null;
  isLoading: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private exerciseService: ExerciseService,
    private exerciseState: ExerciseStateService
  ) {}

  ngOnInit() {
    const savedData = this.exerciseState.getExerciseData();
    if (savedData) {
      console.log('Datos guardados recuperados:', savedData);
      this.exercise = { ...this.exercise, ...savedData };
    }

    this.selectedMuscularGroup = this.exerciseState.getSelectedMuscularGroup();
    console.log('Grupo muscular seleccionado:', this.selectedMuscularGroup);

    console.log('ID del grupo muscular:', this.exercise.muscle_group_id);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  navigateToMuscleGroupSelection() {
    this.exerciseState.updateExerciseData(this.exercise);
    this.router.navigate(['/select-muscular-group'], { queryParams: { returnUrl: '/add-exercise' } });
  }

  saveExercise() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    if (!this.exercise.muscle_group_id) {
      console.error('No se ha seleccionado un grupo muscular.');
      return;
    }

    if (!this.exercise.name || !this.exercise.description) {
      console.error('Nombre y descripción son requeridos.');
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.exercise.name);
    formData.append('description', this.exercise.description);
    formData.append('muscle_group_id', this.exercise.muscle_group_id.toString());
    formData.append('image', this.selectedFile);

    this.exerciseService.saveExercise(formData).subscribe({
      next: (response) => {
        console.log('Ejercicio guardado exitosamente:', response);
        this.isLoading = false;
        // Aquí puedes agregar una notificación de éxito
        // Y redirigir a otra página si lo deseas
        this.router.navigate(['/exercise-panel']); // O la ruta que prefieras
      },
      error: (error) => {
        console.error('Error al guardar el ejercicio:', error);
        this.isLoading = false;
        // Aquí puedes agregar una notificación de error
      }
    });
  }
}
