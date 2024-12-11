import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

interface Routine {
  id: number;
  name: string;
  exercises: Array<{
    id: number;
    name: string;
    sets: number;
    image_url: string;
    position: number;
    uniqueId?: number;
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

        const filteredExercises = exercises
          .filter(exercise => !this.temporarilyDeletedExercises.has(exercise.id))
          .map(exercise => ({
            ...exercise,
            uniqueId: Date.now() + Math.random()
          }));
        
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
    let exercises = this.exerciseOrderMap.get(routineId) || [];
    exercises = [...exercises, {
      ...exercise,
      uniqueId: Date.now() + Math.random()
    }];
    this.exerciseOrderMap.set(routineId, exercises);
  }

  clearTemporaryExercises(routineId: number) {
    this.temporarilyDeletedExercises.clear();
    this.temporarilyAddedExercises.delete(routineId);
    this.exerciseOrderMap.delete(routineId);
  }

  saveRoutineChanges(routineId: number, exercises: any[], routineName: string): Observable<any> {
    const payload = {
      routine_id: routineId,
      name: routineName,
      exercises: exercises.map((exercise, index) => ({
        exercise_id: exercise.id,
        sets: exercise.sets,
        position: index + 1
      }))
    };

    console.log('Payload de la rutina editada:', JSON.stringify(payload, null, 2));

    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/routines/${routineId}/exercises`, payload, { headers }).pipe(
      tap(() => {
        this.exerciseOrderMap.delete(routineId);
      })
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

  getRoutine(routineId: number): Observable<Routine> {
    const headers = this.getHeaders();
    return this.http.get<Routine>(`${this.apiUrl}/routines/${routineId}`, { headers }).pipe(
      map((routine: Routine) => {
        if (routine && Array.isArray(routine.exercises)) {
          routine.exercises = routine.exercises.map(exercise => ({
            ...exercise,
            uniqueId: Date.now() + Math.random()
          }));
        }
        return routine;
      }),
      tap(routine => console.log('Datos de rutina recibidos:', routine)),
      catchError(this.handleError)
    );
  }

  createRoutine(routineData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/create-routine/`, routineData, { headers }).pipe(
      tap(response => console.log('Respuesta de crear rutina:', response)),
      catchError(this.handleError)
    );
  }

  deleteRoutine(routineId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/routines/${routineId}`, { headers }).pipe(
      tap(response => console.log('Rutina eliminada:', response)),
      catchError(this.handleError)
    );
  }

  unassignRoutine(clientId: number, routineId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/users/${clientId}/routines/${routineId}`, { headers }).pipe(
      tap(response => console.log('Rutina desasignada:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => error);
  }

  
  assignRoutine(clientId: number, routineId: number): Observable<any> {
    const headers = this.getHeaders();
    
    return this.http.post(
      `${this.apiUrl}/users/${clientId}/routines/${routineId}`, 
      {}, 
      { headers }
    ).pipe(
      tap(response => console.log('Rutina asignada:', response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al asignar rutina:', error);
        
        if (error.status === 403) {
          return throwError(() => new Error('No tienes permiso para asignar esta rutina'));
        } else if (error.status === 400) {
          return throwError(() => new Error('Esta rutina ya está asignada al cliente'));
        } else {
          return throwError(() => new Error('Error al asignar la rutina'));
        }
      })
    );
  }

  saveWorkout(workoutData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/workouts`, workoutData, { headers });
  }

  deleteRoutineAdmin(routineId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<{message: string}>(
      `${environment.apiUrl}/admin/routines/${routineId}`,
      { headers }
    );
  }

}


