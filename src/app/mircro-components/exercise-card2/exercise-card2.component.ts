import { Component, Input } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseModalComponent } from '../exercise-modal/exercise-modal.component';
import { BtnComponent } from '../btn/btn.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-card2',
  standalone: true,
  imports: [ExerciseModalComponent, BtnComponent, CommonModule],
  templateUrl: './exercise-card2.component.html',
  styleUrls: ['./exercise-card2.component.css']
})
export class ExerciseCard2Component {
  @Input() imageUrl: string = 'exerciseImg/incline-bench-press.jpg';
  @Input() exerciseName: string = 'Press de Banca Inclinado';
  @Input() exerciseId: number = 0;

  showModal: boolean = false;
  exerciseDetails: any;

  constructor(private exerciseService: ExerciseService, private router: Router) {}

  onHeaderClick(): void {
    this.exerciseService.getExerciseById(this.exerciseId).subscribe(
      (exercise) => {
        this.exerciseDetails = exercise;
        this.showModal = true;
      },
      (error) => {
        console.error('Error al obtener los detalles del ejercicio:', error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  onEdit(): void {
    console.log('Editar ejercicio:', this.exerciseId);
    this.router.navigate(['/edit-exercise', this.exerciseId]);
  }

  onDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
      this.exerciseService.deleteExercise(this.exerciseId).subscribe({
        next: (response) => {
          console.log('Ejercicio eliminado exitosamente:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar el ejercicio:', error);
          alert('No se pudo eliminar el ejercicio. Inténtalo de nuevo más tarde.');
        }
      });
    }


    
  }
}
