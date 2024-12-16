import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UserRole } from './constants/roles';
import { CoachDashboardComponent } from './pages/coach-dashboard/coach-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MyRoutinesComponent } from './pages/my-routines/my-routines.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
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
import { AdminClientList2Component } from './mircro-components/admin-client-list2/admin-client-list2.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MembershipCardComponent } from './mircro-components/membership-card/membership-card.component';
import { MembershipsListComponent } from './pages/memberships-list/memberships-list.component';
import { EditMembershipComponent } from './pages/edit-membership/edit-membership.component';
import { AddMembershipComponent } from './pages/add-membership/add-membership.component';
import { AddMembershipUserComponent } from './pages/add-membership-user/add-membership-user.component';
import { MembershipStatsComponent } from './pages/membership-stats/membership-stats.component';
import { ViewWorkoutComponent } from './pages/view-workout/view-workout.component';
import { ClientViewWorkoutComponent } from './pages/client-view-workout/client-view-workout.component';
import { WorkoutListComponent } from './mircro-components/workout-list/workout-list.component';
import { InProgressRoutineComponent } from './pages/in-progress-routine/in-progress-routine.component';
import { CoachClientStatsComponent } from './pages/coach-client-stats/coach-client-stats.component';
import { ViewClientStatsComponent } from './pages/view-client-stats/view-client-stats.component';
import { CoachViewWorkoutComponent } from './pages/coach-view-workout/coach-view-workout.component';
import { ProfileComponent } from './mircro-components/profile/profile.component';
import { ClientSelfProfileComponent } from './pages/client-self-profile/client-self-profile.component';
import { CoachSelfProfileComponent } from './pages/coach-self-profile/coach-self-profile.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { CoachRecipesComponent } from './pages/coach-recipes/coach-recipes.component';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
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
    path: 'client-view-workout/:id',
    component: ClientViewWorkoutComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  {
    path: 'in-progress-routine',
    component: InProgressRoutineComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.CLIENT])]
  },
  {
    path: 'view-recipe/:id',
    component: ViewRecipeComponent,
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
    path: 'coach-self-profile',
    component: CoachSelfProfileComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'coach-recipes',
    component: CoachRecipesComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipeComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
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
    path: 'coach-client-stats/:id',
    component: CoachClientStatsComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
  },
  {
    path: 'view-client-stats/:id',
    component: ViewClientStatsComponent,
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
    path: 'membership-card',
    component: MembershipCardComponent
  },
  {
    path:'admin-client-list',
    component: AdminClientListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'workout-list',
    component: WorkoutListComponent
  },
  {
    path: 'general-volume',
    component: GeneralVolumeComponent
  },
  {
    path: 'admin-client-list2',
    component: AdminClientList2Component
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
    path: 'client-self-profile',
    component: ClientSelfProfileComponent,
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
    path: 'view-workout/:id',
    component: ViewWorkoutComponent,
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
    path: 'membership-stats',
    component: MembershipStatsComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'memberships',
    component: MembershipsListComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'edit-membership/:id',
    component: EditMembershipComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'add-membership',
    component: AddMembershipComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'add-membership-user/:id',
    component: AddMembershipUserComponent,
    canActivate: [authGuard],
    canActivateChild: [() => roleGuard([UserRole.ADMIN])]
  },
  {
    path: 'coach-view-workout/:id',
    component: CoachViewWorkoutComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard([UserRole.COACH])]
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
