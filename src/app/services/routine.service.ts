import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

interface Routine {
  id: number;
  name: string;
  coach_id: number;
  exercises: Array<{
    id: number;
    name: string;
    sets: number;
    position: number;
  }>;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  position: number;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private apiUrl = 'http://localhost:8000';
  private temporarilyDeletedExercises = new Set<number>();
  private temporarilyAddedExercises = new Map<number, any[]>();
  private exerciseOrderMap = new Map<number, any[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.warn('Token no encontrado, redirigiendo al login...');
      this.router.navigate(['/login']);
      throw new Error('No se encontró el token de autenticación');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getCoachRoutines(): Observable<any> {
    if (!this.authService.isAuthenticated()) {
      console.error('Usuario no autenticado');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const headers = this.getHeaders();

    return this.http.get(`${this.apiUrl}/coach-routines`, { headers }).pipe(
      tap(response => console.log('Rutinas del coach:', response)),
      catchError(this.handleError)
    );
  }

  getUserRoutines(userId: number): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(`${this.apiUrl}/users/${userId}/routines/`, { headers }).pipe(
      tap(response => console.log('Rutinas del usuario:', response)),
      catchError(this.handleError)
    );
  }

  getRoutineExercises(routineId: number): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<Exercise[]>(`${this.apiUrl}/routines/${routineId}/exercises/`, { headers }).pipe(
      map(exercises => {
        if (this.exerciseOrderMap.has(routineId)) {
          return this.exerciseOrderMap.get(routineId)!;
        }

        const filteredExercises = exercises.filter(exercise => 
          !this.temporarilyDeletedExercises.has(exercise.id)
        );
        
        const tempExercises = this.temporarilyAddedExercises.get(routineId) || [];
        const orderedExercises = [...filteredExercises, ...tempExercises];
        
        this.exerciseOrderMap.set(routineId, orderedExercises);
        
        return orderedExercises;
      }),
      tap(exercises => console.log('Ejercicios de la rutina (ordenados):', exercises)),
      catchError(this.handleError)
    );
  }

  updateExercisesOrder(routineId: number, exercises: any[]) {
    this.exerciseOrderMap.set(routineId, exercises.map((exercise, index) => ({
      ...exercise,
      position: index
    })));
    console.log('Nuevo orden guardado para rutina', routineId, ':', this.exerciseOrderMap.get(routineId));
  }

  addTemporaryExercise(routineId: number, exercise: any) {
    const currentExercises = this.exerciseOrderMap.get(routineId) || [];
    
    const newExercise = {
      ...exercise,
      sets: 1,
      position: currentExercises.length
    };

    if (!this.temporarilyAddedExercises.has(routineId)) {
      this.temporarilyAddedExercises.set(routineId, []);
    }
    this.temporarilyAddedExercises.get(routineId)!.push(newExercise);

    currentExercises.push(newExercise);
    this.exerciseOrderMap.set(routineId, currentExercises);
    
    console.log('Ejercicio agregado y orden actualizado:', this.exerciseOrderMap.get(routineId));
  }

  clearTemporaryExercises(routineId: number) {
    this.temporarilyDeletedExercises.clear();
    this.temporarilyAddedExercises.delete(routineId);
    this.exerciseOrderMap.delete(routineId);
  }

  saveRoutineChanges(routineId: number, exercises: any[], routineName: string): Observable<any> {
    const currentExercises = this.exerciseOrderMap.get(routineId) || exercises;

    const payload = {
      routine_id: routineId,
      name: routineName,
      exercises: currentExercises.map((exercise, index) => ({
        exercise_id: exercise.id,
        sets: exercise.sets,
        position: index + 1
      }))
    };

    console.log('Payload de la rutina editada:', JSON.stringify(payload, null, 2));

    const headers = this.getHeaders();

    console.log('Headers:', headers);

    return this.http.put(`${this.apiUrl}/routines/${routineId}/exercises`, payload, { headers }).pipe(
      map(() => {
        this.clearTemporaryExercises(routineId);
        console.log('Cambios de rutina guardados correctamente');
        return true;
      }),
      catchError(this.handleError)
    );
  }

  markExerciseAsDeleted(routineId: number, exerciseId: number) {
    this.temporarilyDeletedExercises.add(exerciseId);

    const currentExercises = this.exerciseOrderMap.get(routineId) || [];
    const updatedExercises = currentExercises.filter(ex => ex.id !== exerciseId);
    
    const reorderedExercises = updatedExercises.map((exercise, index) => ({
      ...exercise,
      position: index
    }));

    this.exerciseOrderMap.set(routineId, reorderedExercises);

    console.log('Ejercicio eliminado:', exerciseId);
    console.log('Nuevo orden:', reorderedExercises);
  }

  getRoutine(routineId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/routines/${routineId}`, { headers }).pipe(
      tap(routine => console.log('Datos de rutina recibidos:', routine)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => error);
  }
}
