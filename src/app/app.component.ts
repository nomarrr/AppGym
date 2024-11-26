import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BtnComponent } from './mircro-components/btn/btn.component';
import { AuthInputFieldComponent } from './mircro-components/auth-input-field/auth-input-field.component';
import { RegisterComponent } from './pages/register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,BtnComponent,AuthInputFieldComponent,RegisterComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppGym';
}
