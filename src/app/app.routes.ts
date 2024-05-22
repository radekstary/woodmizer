import { Routes } from '@angular/router';
import { UsersComponent } from './views/users/users.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'users',
    title: 'Wybór użytkownika',
    component: UsersComponent,
  },
  {
    path: 'login',
    title: 'Logowanie',
    component: LoginComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
