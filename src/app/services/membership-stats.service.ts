import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface PaymentStat {
  date: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class MembershipStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPaymentStats(period: 'week' | 'month' | 'year'): Observable<PaymentStat[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    return this.http.get<PaymentStat[]>(
      `${this.apiUrl}/memberships/payments/stats?period=${period}`,
      { headers }
    );
  }

  getOnlinePaymentStats(period: 'week' | 'month' | 'year'): Observable<PaymentStat[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    return this.http.get<PaymentStat[]>(
      `${this.apiUrl}/memberships/online-payments/stats?period=${period}`,
      { headers }
    );
  }

  getAllPaymentStats(period: 'week' | 'month' | 'year'): Observable<PaymentStat[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    return this.http.get<PaymentStat[]>(
      `${this.apiUrl}/memberships/all-payments/stats?period=${period}`,
      { headers }
    );
  }
} 