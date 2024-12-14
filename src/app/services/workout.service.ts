import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWorkout(workoutId: number): Observable<any> {
    const url = `${this.apiUrl}/workouts/${workoutId}`;
    
    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token');
    
    // Configurar los headers con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la petición HTTP con los headers
    return this.http.get(url, { headers });
  }

  getUserWorkouts(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/workouts`;
    
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(url, { headers });
  }

  // Método auxiliar para manejar errores (opcional)
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
} 