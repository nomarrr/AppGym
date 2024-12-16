import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from '../btn/btn.component';
import { UserService } from '../../services/user.service';
import { Input } from '@angular/core';
import { WeightModalComponent } from '../weight-modal/weight-modal.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, BtnComponent, WeightModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userBio: string = '';
  userImage: string = '';
  workoutCount: number | null = null;
  membershipDaysRemaining: number | null = null;
  @Input() userId: number = 16;
  isEditing: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  showWeightModal: boolean = false;
  isCoach: boolean = false;

  constructor(private userService: UserService, private tokenService: TokenService) {}

  ngOnInit() {
    this.loadUserData();
    this.isCoach = this.tokenService.getRoleFromToken() === 1;
  }

  loadUserData() {
    const userId = this.userId; // Reemplaza con el ID del usuario actual
    this.userService.getUserDetails(userId).subscribe({
      next: (data) => {
        this.userName = data.name;
        this.userBio = data.bio;
        this.userImage = data.image_url;
        if (data.role === 'client') {
          this.workoutCount = data.workout_count ?? 0;
          this.membershipDaysRemaining = data.membership_days_remaining ?? 0;
        }
      },
      error: (error) => {
        console.error('Error al cargar los detalles del usuario:', error);
      }
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      this.saveProfile();
    }
    this.isEditing = !this.isEditing;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    console.log('Nombre enviado:', this.userName);
    console.log('Biografía enviada:', this.userBio);

    const formData = new FormData();
    formData.append('name', this.userName);
    formData.append('description', this.userBio);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userService.updateUserProfile(this.userId, formData).subscribe({
      next: (response) => {
        console.log('Perfil actualizado exitosamente', response);
        this.isEditing = false;
        this.loadUserData(); // Recarga los datos para actualizar la imagen, nombre y descripción
      },
      error: (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadUserData();
  }

  onAddWeightRecord() {
    this.toggleWeightModal();
  }

  triggerFileInput() {
    if (this.isEditing) {
      const fileInput = document.getElementById('fileInput') as HTMLElement;
      fileInput.click();
    }
  }

  toggleWeightModal() {
    this.showWeightModal = !this.showWeightModal;
  }

  handleWeightSave(weight: number) {
    console.log('Peso guardado:', weight);
    // Lógica para guardar el peso
  }
}
