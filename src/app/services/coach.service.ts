import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  getClients(): Observable<Client[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Client[]>(`${this.apiUrl}/coach/clients`, { headers });
  }

  getClientDetail(clientId: number): Observable<ClientDetail> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<ClientDetail>(`${this.apiUrl}/coach-view-client/${clientId}`, { headers });
  }

  assignClient(clientId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<any>(`${this.apiUrl}/coach/assign-client/${clientId}`, {}, { headers });
  }
} 