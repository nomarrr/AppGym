import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface WorkoutVolume {
  id: number;
  date: string;
  total_volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getVolumeData(): Observable<WorkoutVolume[]> {
    const headers = this.getHeaders();
    return this.http.get<WorkoutVolume[]>(`${this.apiUrl}/workouts/volume`, { headers });
  }

  getMuscleGroupVolumeData() {
    return this.http.get<any>(`${this.apiUrl}/workouts/volume/muscle-groups`, { headers: this.getHeaders() });
  }

  getMuscleGroupSetsData() {
    return this.http.get<any>(`${this.apiUrl}/workouts/sets/muscle-groups`, { headers: this.getHeaders() });
  }

  getUserWeights() {
    return this.http.get<any>(`${this.apiUrl}/user/weights`, { headers: this.getHeaders() });
  }
} 