import { Component } from '@angular/core';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { AuthInputFieldComponent } from '../../mircro-components/auth-input-field/auth-input-field.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { LoginResponse } from './login-response.model'; // Asegúrate de que la ruta sea correcta

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

  constructor(private router: Router, private http: HttpClient) {}

  Login(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    
    const body = new HttpParams()
      .set('username', this.email)
      .set('password', this.password);

    const headers = new HttpHeaders().set(
      'Content-Type', 'application/x-www-form-urlencoded'
    );

    this.http.post<LoginResponse>('http://localhost:8000/login/', body.toString(), { headers })
      .subscribe({
        next: response => {
          console.log('Login exitoso:', response);
          // Aquí puedes almacenar el token
          localStorage.setItem('access_token', response.access_token);
        },
        error: error => {
          console.error('Error en el login:', error);
          // Manejo de errores según el estado
          if (error.status === 400) {
            alert('Credenciales incorrectas. Intenta de nuevo.');
          } else {
            alert('Ocurrió un error. Por favor, inténtalo más tarde.');
          }
        },
        complete: () => {
          console.log('La solicitud de login se ha completado.');
        }
      });
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  goToRecoverPassword(){
    this.router.navigate(['/recover-password']);
  }

}
