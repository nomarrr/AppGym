import { Component } from '@angular/core';
import { BtnComponent } from "../../mircro-components/btn/btn.component";
import { AuthInputFieldComponent } from '../../mircro-components/auth-input-field/auth-input-field.component';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [BtnComponent,AuthInputFieldComponent,FormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  constructor(private router: Router, private http: HttpClient) {}
  email: string = '';

  sendEmail(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log('Email:', this.email);

    const body = new HttpParams()
    .set('email', this.email)

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    //Crear endpoint para enviar correo electronico
    /*
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
    */
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
