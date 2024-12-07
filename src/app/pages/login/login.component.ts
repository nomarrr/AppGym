import { Component } from '@angular/core';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { AuthInputFieldComponent } from '../../mircro-components/auth-input-field/auth-input-field.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BtnComponent, AuthInputFieldComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  Login(event: Event) {
    event.preventDefault();
    
    this.authService.login(this.email, this.password).subscribe({
      next: response => {
        console.log('Login exitoso:', response);
        // La redirección la maneja el AuthService según el rol
      },
      error: error => {
        console.error('Error en el login:', error);
        if (error.status === 400) {
          alert('Credenciales incorrectas. Intenta de nuevo.');
        } else {
          alert('Ocurrió un error. Por favor, inténtalo más tarde.');
        }
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}
