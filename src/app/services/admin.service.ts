import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

interface Coach {
  id: number;
  name: string;
  image_url: string;
}

interface User {
  id: number;
  name: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Algo salió mal; por favor intenta de nuevo.'));
  }

  getCoaches(): Observable<Coach[]> {
    const headers = this.getHeaders();
    return this.http.get<Coach[]>(`${this.apiUrl}/coaches`, { headers })
      .pipe(catchError(this.handleError));
  }

  createCoach(coachData: Partial<Coach>): Observable<Coach> {
    const headers = this.getHeaders();
    return this.http.post<Coach>(`${this.apiUrl}/coaches`, coachData, { headers })
      .pipe(catchError(this.handleError));
  }

  updateCoach(id: number, coachData: Partial<Coach>): Observable<Coach> {
    const headers = this.getHeaders();
    return this.http.put<Coach>(`${this.apiUrl}/coaches/${id}`, coachData, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteCoach(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/coaches/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getCoachById(id: number): Observable<Coach> {
    const headers = this.getHeaders();
    return this.http.get<Coach>(`${this.apiUrl}/coaches/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/get_users/`, { headers })
      .pipe(catchError(this.handleError));
  }
} 