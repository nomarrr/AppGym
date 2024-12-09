import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

interface Client {
  id: number;
  name: string;
  image_url: string;
}

interface ClientDetail {
  id: number;
  name: string;
  bio: string;
  workouts: number;
  image_url: string;
  is_responsible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getClients(): Observable<Client[]> {
    const headers = this.getHeaders();
    return this.http.get<Client[]>(`${this.apiUrl}/coach/clients`, { headers });
  }

  getClientDetail(clientId: number): Observable<ClientDetail> {
    const headers = this.getHeaders();
    return this.http.get<ClientDetail>(`${this.apiUrl}/coach-view-client/${clientId}`, { headers });
  }

  assignClient(clientId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/coach/assign-client/${clientId}`, {}, { headers });
  }

  getUnassignedClients(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/clients/unassigned`, { headers }).pipe(
      tap(response => console.log('Clientes sin asignar:', response)),
      catchError(this.handleError)
    );
  }
} 