import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Exercise } from '../interfaces/exercise.interface';
import { MuscularGroup } from '../interfaces/muscular-group.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = `${environment.apiUrl}/create-exercise`;

  constructor(private http: HttpClient) {}

  saveExercise(formData: FormData): Observable<any> {
    // Imprimir todas las claves en localStorage
    console.log('Todas las claves en localStorage:', Object.keys(localStorage));
    
    // Obtener y mostrar el token
    const token = localStorage.getItem('access_token');
    console.log('Token completo:', token);

    if (!token) {
      console.error('No hay token disponible');
      return throwError(() => new Error('No hay token disponible'));
    }

    // Mostrar el contenido del FormData
    console.log('Contenido del FormData:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // Crear las cabeceras con el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers completos:', headers.keys());

    console.log('Headers:', headers); // Para debugging

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }

  getExercisesByMuscleGroup(muscleGroupId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError(() => new Error('No hay token disponible'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/exercises/muscle_group/${muscleGroupId}`, { headers });
  }

  getExercises(): Observable<Exercise[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Exercise[]>(`${environment.apiUrl}/api/exercises/`, { headers });
  }

  getExerciseById(exerciseId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`${environment.apiUrl}/exercises/${exerciseId}`, { headers });
  }

  addExerciseToRoutine(routineId: number, exerciseId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post(
      `${environment.apiUrl}/api/routines/${routineId}/exercises/`,
      { exercise_id: exerciseId },
      { headers }
    );
  }

  updateExercise(exerciseId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formDataObj: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    console.log('Datos enviados al endpoint:', {
      exerciseId,
      formData: formDataObj
    });

    return this.http.put<any>(`${environment.apiUrl}/exercises/${exerciseId}`, formData, { headers });
  }

  deleteExercise(exerciseId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${environment.apiUrl}/exercises/${exerciseId}`, { headers });
  }
}