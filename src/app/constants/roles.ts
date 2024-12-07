export enum UserRole {
  CLIENT = 1,
  COACH = 2,
  ADMIN = 3
}

// Helper function para convertir número a string (útil para logs y mensajes)
export function getRoleName(role: number): string {
  switch (role) {
    case UserRole.ADMIN: return 'Administrador';
    case UserRole.COACH: return 'Entrenador';
    case UserRole.CLIENT: return 'Cliente';
    default: return 'Desconocido';
  }
}
