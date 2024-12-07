import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UserRole } from './constants/roles';
import { CoachDashboardComponent } from './pages/coach-dashboard/coach-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MyRoutinesComponent } from './pages/my-routines/my-routines.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RoutineComponent } from './pages/routine/routine.component';
import { ExerciseCard2Component } from './mircro-components/exercise-card2/exercise-card2.component';
import { ExercisesComponent } from './mircro-components/exercises/exercises.component';
import { ExercisePanelComponent } from './pages/exercise-panel/exercise-panel.component';
import { AddExerciseComponent } from './pages/add-exercise/add-exercise.component';
import { SelectMuscularGroupComponent } from './pages/select-muscular-group/select-muscular-group.component';
import { CoachRoutineListComponent } from './mircro-components/coach-routine-list/coach-routine-list.component';
import { CoachMyRoutineListComponent } from './mircro-components/coach-my-routine-list/coach-my-routine-list.component';
import { CoachRoutinesComponent } from './pages/coach-routines/coach-routines.component';
import { EditRoutineComponent } from './pages/edit-routine/edit-routine.component';
import { SelectExerciseCard2Component } from './mircro-components/select-exercise-card2/select-exercise-card2.component';
import { ExerciseListComponent } from './mircro-components/exercise-list/exercise-list.component';
import { SelectExerciseComponent } from './pages/select-exercise/select-exercise.component';
export const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'my-routines', 
    component: MyRoutinesComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  { 
    path: 'recipes', 
    component: RecipesComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  { 
    path: 'coach-dashboard', 
    component: CoachDashboardComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  { 
    path: 'routine/:id', 
    component: RoutineComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  {
    path: 'exercise-card2',
    component: ExerciseCard2Component
  },
  {
    path: 'coach-routine-list',
    component: CoachRoutineListComponent
  },
  {
    path: 'coach-my-routine-list',
    component: CoachMyRoutineListComponent
  },
  {
    path: 'select-exercise',
    component: SelectExerciseComponent
  },
  {
    path: 'exercise-list',
    component: ExerciseListComponent
  },
  {
    path: 'edit-routine/:id',
    component: EditRoutineComponent
  },
  {
    path: 'coach-routines',
    component: CoachRoutinesComponent
  },
  {
    path: 'select-exercise-card2',
    component: SelectExerciseCard2Component
  },
  {
    path: 'exercises',
    component: ExercisesComponent
  },
  {
    path: 'exercise-panel',
    component: ExercisePanelComponent
  },
  {
    path: 'add-exercise',
    component: AddExerciseComponent
  },
  {
    path: 'select-muscular-group',
    component: SelectMuscularGroupComponent
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
