import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../interfaces/exercise.interface';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from '../../mircro-components/btn/btn.component';
import { CoachSidebarComponent } from '../../mircro-components/coach-sidebar/coach-sidebar.component';
import { ExerciseStateService } from '../../services/exercise-state.service';
import { MuscularGroup } from '../../interfaces/muscular-group.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-exercise',
  standalone: true,
  imports: [FormsModule, BtnComponent, CoachSidebarComponent],
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {
  exercise: Exercise = {
    id: 0,
    name: '',
    description: '',
    muscle_group_id: 0,
    image_url: ''
  };
  
  previewUrl: string | null = null;
  fileName: string = '';
  isLoading: boolean = false;
  selectedFile: File | null = null;
  exerciseId: number = 0;
  selectedMuscularGroup: MuscularGroup | null = null;
  selectedFileUrl: string | null = null;

  private selectedMuscularGroupSubject = new BehaviorSubject<MuscularGroup | null>(null);
  currentMuscularGroup$ = this.selectedMuscularGroupSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private exerciseState: ExerciseStateService
  ) {}

  ngOnInit() {
    this.exerciseId = +this.route.snapshot.paramMap.get('id')!;
    const storedExercise = localStorage.getItem('editingExercise');
    if (storedExercise) {
      const parsedExercise = JSON.parse(storedExercise);
      this.exercise = parsedExercise.exercise;
      this.previewUrl = parsedExercise.imageUrl;
    } else {
      this.loadExercise();
    }

    this.exerciseState.currentMuscularGroup$.subscribe(group => {
      if (group) {
        this.selectedMuscularGroup = group;
        console.log('Musculo seleccionado:', this.selectedMuscularGroup.id);
      } else {
        console.log('No se seleccionó ningún grupo muscular.');
      }
    });
  }

  loadExercise() {
    this.exerciseService.getExerciseById(this.exerciseId).subscribe({
      next: (data) => {
        this.exercise = data;
        this.previewUrl = this.exercise.image_url;
        this.selectedMuscularGroup = { id: this.exercise.muscle_group_id, name: 'Nombre del grupo muscular' }; // Actualiza con el nombre real
      },
      error: (error) => {
        console.error('Error al cargar el ejercicio:', error);
      }
    });
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
    localStorage.setItem('editingExercise', JSON.stringify({
      exercise: this.exercise,
      imageUrl: this.previewUrl
    }));
    this.router.navigate(['/select-muscular-group'], { queryParams: { returnUrl: '/edit-exercise/' + this.exerciseId } });
  }

  updateExercise() {
    if (!this.exercise.name || !this.exercise.description) {
      console.error('Nombre y descripción son requeridos.');
      return;
    }

    if (!this.selectedMuscularGroup) {
      console.error('Grupo muscular no seleccionado.');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.exercise.name);
    formData.append('description', this.exercise.description);
    formData.append('muscle_group_id', this.selectedMuscularGroup.id.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    console.log('Datos enviados al backend:', {
      name: this.exercise.name,
      description: this.exercise.description,
      muscle_group_id: this.selectedMuscularGroup.id,
      image: this.selectedFile ? this.selectedFile.name : null
    });

    this.exerciseService.updateExercise(this.exerciseId, formData).subscribe({
      next: (response) => {
        console.log('Ejercicio actualizado exitosamente:', response);
        this.isLoading = false;
        localStorage.removeItem('editingExercise');
        this.router.navigate(['/exercise-panel']);
      },
      error: (error) => {
        console.error('Error al actualizar el ejercicio:', error);
        this.isLoading = false;
      }
    });
  }

  onGroupSelected(group: MuscularGroup) {
    console.log('Grupo muscular seleccionado:', group);
    if (group) {
      this.exerciseState.updateSelectedMuscularGroup(group);
      this.exerciseState.updateExerciseData({
        muscle_group_id: group.id
      });
    }
  }
}
