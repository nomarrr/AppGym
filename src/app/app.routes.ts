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
import { CreateRoutineComponent } from './pages/create-routine/create-routine.component';
import { CoachViewClientComponent } from './pages/coach-view-client/coach-view-client.component';
import { ClientRoutinesComponent } from './pages/client-routines/client-routines.component';
import { AssignExistentRoutineClientComponent } from './pages/assign-existent-routine-client/assign-existent-routine-client.component';
import { UnassignedClientsComponent } from './pages/unassigned-clients/unassigned-clients.component';
import { ClientStatsComponent } from './pages/client-stats/client-stats.component';
import { GeneralVolumeComponent } from './mircro-components/general-volume/general-volume.component';
import { StatsComponent } from './pages/stats/stats.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CoachClientCardComponent } from './mircro-components/coach-client-card/coach-client-card.component';
import { AdminClientListComponent } from './mircro-components/admin-client-list/admin-client-list.component';
import { AddCoachComponent } from './pages/add-coach/add-coach.component';
import { AdminProfileComponent } from './mircro-components/admin-profile/admin-profile.component';
import { AdminViewProfileComponent } from './pages/admin-view-profile/admin-view-profile.component';
import { ViewCoachRoutinesComponent } from './pages/view-coach-routines/view-coach-routines.component';
import { ExerciseCard3Component } from './mircro-components/exercise-card3/exercise-card3.component';
import { ViewRoutineComponent } from './pages/view-routine/view-routine.component';

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
    path: 'create-routine',
    component: CreateRoutineComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'assign-existent-routine-client/:id',
    component: AssignExistentRoutineClientComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'coach-routine-list',
    component: CoachRoutineListComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'coach-my-routine-list',
    component: CoachMyRoutineListComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'select-exercise',
    component: SelectExerciseComponent
  },
  {
    path:'admin-client-list',
    component: AdminClientListComponent
  },
  {
    path: 'general-volume',
    component: GeneralVolumeComponent
  },
  {
    path: 'exercise-card3',
    component: ExerciseCard3Component
  },
  {
    path:'coach-client-card',
    component: CoachClientCardComponent
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent
  },
  {
    path: 'client-stats',
    component: ClientStatsComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  {
    path: 'exercise-list',
    component: ExerciseListComponent
  },
  {
    path: 'edit-routine/:id',
    component: EditRoutineComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'coach-routines',
    component: CoachRoutinesComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
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
    component: ExercisePanelComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'add-exercise',
    component: AddExerciseComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'select-muscular-group',
    component: SelectMuscularGroupComponent
  },
  {
    path: 'coach-view-client/:id',
    component: CoachViewClientComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'client-routines/:id',
    component: ClientRoutinesComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'unassigned-clients',
    component: UnassignedClientsComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  { 
    path: 'stats',
    component: StatsComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'add-coach',
    component: AddCoachComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]   
  },
  {
    path: 'admin-view-profile/:id',
    component: AdminViewProfileComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]   
  },
  {
    path: 'view-coach-routines/:id',
    component: ViewCoachRoutinesComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'view-routine/:id',
    component: ViewRoutineComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
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
