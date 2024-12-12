import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface UserDetails {
  id: number;
  name: string;
  bio: string;
  image_url: string;
  role: 'coach' | 'client';
  client_count?: number;
  workout_count?: number;
  membership_days_remaining?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Algo salió mal; por favor intenta de nuevo.'));
  }

  promoteToCoach(userId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(
      `${environment.apiUrl}/users/${userId}/promote-to-coach`, 
      {},
      { headers }
    );
  }

  getUserDetails(userId: number) {
    return this.http.get<UserDetails>(`${environment.apiUrl}/users/${userId}/details`);
  }

  demoteToClient(userId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<{message: string}>(
      `${environment.apiUrl}/users/${userId}/demote-to-client`,
      {},
      { headers }
    );
  }

  revokeMembership(userId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<{message: string}>(
      `${environment.apiUrl}/users/${userId}/memberships/revoke`,
      { headers }
    );
  }
} 