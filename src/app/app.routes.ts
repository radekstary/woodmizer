import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Wybór użytkownika',
    component: LoginComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
