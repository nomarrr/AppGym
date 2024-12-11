import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}

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
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<UserDetails>(
      `${environment.apiUrl}/users/${userId}/details`,
      { headers }
    );
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
} 