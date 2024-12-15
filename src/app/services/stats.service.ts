import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface WorkoutVolume {
  id: number;
  date: string;
  total_volume: number;
}

interface MuscleGroup {
  id: number;
  name: string;
  volumes: number[];
  bestVolume: number;
  sets: number[];
  bestSets?: number;
}

interface MuscleGroupVolumeData {
  dates: string[];
  muscle_groups: MuscleGroup[];
}

interface MuscleGroupSetsData {
  dates: string[];
  muscle_groups: MuscleGroup[];
}

interface WeightData {
  date: string;
  weight: number;
}

interface MonthlyWeightData {
  months: string[];
  average_weights: number[];
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

  getVolumeData(userId: number, period: 'week' | 'month' | 'year'): Observable<WorkoutVolume[]> {
    const headers = this.getHeaders();
    return this.http.get<WorkoutVolume[]>(`${this.apiUrl}/workouts/volume/${userId}?period=${period}`, { headers });
  }

  getMuscleGroupVolumeData(userId: number, period: 'week' | 'month' | 'year'): Observable<MuscleGroupVolumeData> {
    const headers = this.getHeaders();
    return this.http.get<MuscleGroupVolumeData>(`${this.apiUrl}/workouts/volume/muscle-groups/${userId}?period=${period}`, { headers });
  }

  getMuscleGroupSetsData(userId: number, period: 'week' | 'month' | 'year'): Observable<MuscleGroupSetsData> {
    const headers = this.getHeaders();
    return this.http.get<MuscleGroupSetsData>(`${this.apiUrl}/workouts/sets/muscle-groups/${userId}?period=${period}`, { headers });
  }

  getUserWeights(userId: number, period: 'week' | 'month' | 'year'): Observable<WeightData[] | MonthlyWeightData> {
    const headers = this.getHeaders();
    return this.http.get<WeightData[] | MonthlyWeightData>(`${this.apiUrl}/user/weights?user_id=${userId}&period=${period}`, { headers });
  }
} 