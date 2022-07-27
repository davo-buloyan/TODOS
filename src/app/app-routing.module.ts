import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, GuestGuard } from './guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  {
    path: 'sign-in',
    title: 'Todos App | Sign In',
    loadComponent: () => import('./sign-in').then((m) => m.SignInComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'sign-up',
    title: 'Todos App | Sign Up',
    loadComponent: () => import('./sign-up').then((m) => m.SignUpComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'todos',
    title: 'Todos App | Todos',
    loadComponent: () => import('./todos').then((m) => m.TodosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    title: 'Todos App | Not Found',
    loadComponent: () => import('./page-not-found').then((m) => m.PageNotFoundComponent),
  },
  { path: '*', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
