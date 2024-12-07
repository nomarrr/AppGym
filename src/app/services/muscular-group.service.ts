import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MuscularGroup } from '../interfaces/muscular-group.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MuscularGroupService {
  private apiUrl = `${environment.apiUrl}/muscle_groups`;

  constructor(private http: HttpClient) {}

  getMuscularGroups(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError(() => new Error('No hay token disponible'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getMuscularGroupById(id: number): Observable<MuscularGroup> {
    return this.http.get<MuscularGroup>(`${this.apiUrl}${id}/`);
  }
} 