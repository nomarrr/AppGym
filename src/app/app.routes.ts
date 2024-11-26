import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { RecoverPassword2Component } from './pages/recover-password2/recover-password2.component';
import { SidebarComponent } from './mircro-components/sidebar/sidebar.component';
import { RoutineCardComponent } from './mircro-components/routine-card/routine-card.component';
import { RoutineListComponent } from './mircro-components/routine-list/routine-list.component';
import { GymStatusComponent } from './mircro-components/gym-status/gym-status.component';
import { MyRoutinesComponent } from './pages/my-routines/my-routines.component';
import { ExerciseCardComponent } from './mircro-components/exercise-card/exercise-card.component';
import { RoutineHeaderComponent } from './mircro-components/routine-header/routine-header.component';
import { RoutineComponent } from './pages/routine/routine.component';
import { RecipeCardComponent } from './mircro-components/recipe-card/recipe-card.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ClientCardComponent } from './mircro-components/client-card/client-card.component';
import { CoachDashboardComponent } from './pages/coach-dashboard/coach-dashboard.component';
import { CoachSidebarComponent } from './mircro-components/coach-sidebar/coach-sidebar.component';
import { GreyBtnComponent } from './mircro-components/grey-btn/grey-btn.component';
import { CoachViewClientComponent } from './pages/coach-view-client/coach-view-client.component';
import { StatsCardComponent } from './mircro-components/stats-card/stats-card.component';
import { StatsListComponent } from './mircro-components/stats-list/stats-list.component';
import { ClientStatsComponent } from './pages/client-stats/client-stats.component';
import { CoachRoutineCardComponent } from './mircro-components/coach-routine-card/coach-routine-card.component';
import { CoachRoutineListComponent } from './mircro-components/coach-routine-list/coach-routine-list.component';
import { ClientRoutinesComponent } from './pages/client-routines/client-routines.component';
import { EditRoutineHeaderComponent } from './mircro-components/edit-routine-header/edit-routine-header.component';
import { EditRoutineNameComponent } from './mircro-components/edit-routine-name/edit-routine-name.component';
import { EditRoutineComponent } from './pages/edit-routine/edit-routine.component';
import { EditExerciseCardComponent } from './mircro-components/edit-exercise-card/edit-exercise-card.component';
export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    //{path: '', redirectTo: 'login', pathMatch: 'full' },// Redirección a login por defecto
    { path: 'recover-password', component: RecoverPasswordComponent},
    {path: 'recover-password2', component:RecoverPassword2Component},
    {path: 'sidebar', component:SidebarComponent},
    //{path: 'routine-card', component:RoutineCardComponent}
    //{path: 'routine-list', component:RoutineListComponent}
    //{path: 'gym-status', component:GymStatusComponent}
    {path: 'my-routines', component:MyRoutinesComponent},
    {path: 'exercise-card', component:ExerciseCardComponent},
    {path: 'routine-header', component:RoutineHeaderComponent},
    {path: 'recipe-card', component:RecipeCardComponent},
    {path: 'routine', component:RoutineComponent},
    {path: 'recipes', component:RecipesComponent},
    {path: 'client-card', component:ClientCardComponent},
    {path: 'coach-dashboard', component:CoachDashboardComponent},
    {path: 'coach-sidebar', component:CoachSidebarComponent},
    {path: 'grey-btn', component:GreyBtnComponent},
    {path: 'coach-view-client', component:CoachViewClientComponent},
    {path: 'stats-card', component:StatsCardComponent},
    {path: 'stats-list', component:StatsListComponent},
    {path: 'client-stats', component:ClientStatsComponent},
    {path: 'coach-routine-card', component:CoachRoutineCardComponent},
    {path: 'coach-routine-list', component:CoachRoutineListComponent},
    {path: 'client-routines', component:ClientRoutinesComponent},
    {path: 'edit-routine-header', component:EditRoutineHeaderComponent},
    {path: 'edit-routine-name', component:EditRoutineNameComponent},
    {path: 'edit-routine', component:EditRoutineComponent},
    {path: 'edit-exercise-card', component:EditExerciseCardComponent}
];
