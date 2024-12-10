import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserRole } from '../constants/roles';

// Definimos la interfaz para la respuesta
interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface TokenPayload {
  user_id: number;
  user_role: number;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private apiUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Removemos el localStorage.clear() si estaba aquí
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(response => {
        if (response.access_token) {
          // Guardamos el token
          localStorage.setItem(this.TOKEN_KEY, response.access_token);
          console.log('Token guardado en login:', response.access_token);
          
          // Verificamos inmediatamente que se guardó
          const storedToken = localStorage.getItem(this.TOKEN_KEY);
          console.log('Token verificado después de guardar:', storedToken);
          
          // Solo redirigimos después de confirmar que el token está guardado
          if (storedToken) {
            this.redirectBasedOnRole();
          }
        }
      })
    );
  }

  redirectBasedOnRole() {
    const userRole = this.getUserRole();
    console.log('Redirigiendo usuario con rol:', userRole);
    
    if (userRole === null) {
      console.error('No se pudo obtener el rol del usuario');
      return;
    }

    // No limpies el localStorage aquí
    switch(userRole) {
      case UserRole.CLIENT:
        this.router.navigate(['/my-routines']);
        break;
      case UserRole.COACH:
        this.router.navigate(['/coach-dashboard']);
        break;
      case UserRole.ADMIN:
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        console.log('Rol no reconocido:', userRole);
        this.router.navigate(['/login']);
    }
  }

  getUserRole(): number | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    
    try {
      console.log('Token almacenado:', token);
      const tokenParts = token.split('.');
      console.log('Partes del token:', tokenParts.length);
      
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log('Payload decodificado:', payload);
      
      return payload.user_role;
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }

  getUserId(): number | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
      return tokenPayload.user_id;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Verificando token:', token);

    if (!token) {
      console.log('No hay token en localStorage');
      return false;
    }

    try {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const expirationDate = new Date(payload.exp * 1000);
      const isValid = new Date() < expirationDate;
      
      console.log('Token válido:', isValid);
      console.log('Fecha expiración:', expirationDate.toISOString());
      
      return isValid;
    } catch (error) {
      console.error('Error al verificar token:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY); // Solo removemos el token, no todo el localStorage
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Token recuperado en AuthService:', token);
    return token;
  }
}