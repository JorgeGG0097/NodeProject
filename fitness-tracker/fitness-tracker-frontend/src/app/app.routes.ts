import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GoalsComponent } from './components/goals/goals.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { RoutinesComponent } from './components/routines/routines.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'goals', component: GoalsComponent},
  { path: 'exercises', component: ExercisesComponent},
  { path: 'routines', component: RoutinesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
