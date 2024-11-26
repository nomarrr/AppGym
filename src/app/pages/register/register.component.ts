import { Component } from '@angular/core';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { AuthInputFieldComponent } from '../../mircro-components/auth-input-field/auth-input-field.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BtnComponent,AuthInputFieldComponent,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router, private http: HttpClient) {}
  name: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';

  Register(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Aquí puedes agregar la lógica para autenticar

    if (this.password !== this.repeatPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    // Restablecer mensaje de error
    this.errorMessage = '';

    const body = new HttpParams()
    .set('name', this.name)
    .set('email', this.email)
    .set('password', this.password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');


    this.http.post('http://localhost:8000/register/',body.toString(), {headers})
      .subscribe({
        next: response => {
          console.log('Registro exitoso ', response);
        },
        error: error => {
          console.log('Error en el registro ',error);

          if (error.status === 400) {
            alert('El correo electrónico ya está en uso.');
          } else {
            alert('Ocurrió un error. Por favor, inténtalo más tarde.');
          }
        }
      });

  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
