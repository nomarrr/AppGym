import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from '../btn/btn.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-weight-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BtnComponent],
  templateUrl: './weight-modal.component.html',
  styleUrls: ['./weight-modal.component.css']
})
export class WeightModalComponent {
  @Input() userId!: number;
  weight: number | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWeight = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  close() {
    this.closeModal.emit();
  }

  save() {
    if (this.weight !== null) {
      this.registerWeight(this.userId, this.weight);
    }
  }

  registerWeight(userId: number, weight: number) {
    const formData = new FormData();
    formData.append('weight', weight.toString());

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    this.http.post(`${environment.apiUrl}/users/${userId}/weight`, formData, { headers }).subscribe({
      next: (response) => {
        alert('Peso registrado con éxito');
        this.saveWeight.emit(weight);
        this.close();
      },
      error: (error) => {
        console.error('Error al registrar el peso:', error);
      }
    });
  }
}
