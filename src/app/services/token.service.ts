import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  user_id: number;
  role: number;
  exp: number;
  // ... otros campos que contenga tu token
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  getUserIdFromToken(): number {
    const token = localStorage.getItem('access_token');
    if (!token) return 0;

    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      return decodedToken.user_id;
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return 0;
    }
  }

  getRoleFromToken(): number {
    const token = localStorage.getItem('access_token');
    if (!token) return 0;

    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      return decodedToken.role;
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return 0;
    }
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  }
} 