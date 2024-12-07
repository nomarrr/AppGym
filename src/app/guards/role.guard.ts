import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../constants/roles';

export const roleGuard = (allowedRoles: UserRole[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // Ocultar contenido inmediatamente antes de cualquier verificación
    document.body.classList.add('loading');
    
    const userRole = authService.getUserRole();
    console.log('Role Guard - Rol actual:', userRole);
    console.log('Role Guard - Roles permitidos:', allowedRoles);

    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirigir y actualizar la URL
      setTimeout(() => {
        if (userRole === UserRole.CLIENT) {
          router.navigate(['/my-routines'], { replaceUrl: true });
        } else if (userRole === UserRole.COACH) {
          router.navigate(['/coach-dashboard'], { replaceUrl: true });
        }
      }, 0);
      return false;
    }

    // Mostrar contenido solo si el rol es correcto
    document.body.classList.remove('loading');
    return true;
  };
};
