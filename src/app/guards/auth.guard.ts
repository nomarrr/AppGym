import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();

  if (isAuth) {
    return true;
  }

  console.log('Usuario no autenticado, redirigiendo a login');
  router.navigate(['/login']);
  return false;
};
