import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  console.log('Auth Guard - ¿Está autenticado?:', isAuth);
  console.log('Auth Guard - Token actual:', localStorage.getItem('access_token'));

  if (isAuth) {
    console.log('Usuario autenticado correctamente');
    return true;
  }

  console.log('Usuario no autenticado, redirigiendo a login');
  router.navigate(['/login']);
  return false;
};
