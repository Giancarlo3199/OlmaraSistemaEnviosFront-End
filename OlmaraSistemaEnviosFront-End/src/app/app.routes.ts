import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Inicio } from './components/inicio/inicio';
import { seguridadGuard } from './guard/seguridad-guard';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: Login },
   { path: 'inicio', component: Inicio, canActivate: [seguridadGuard] },
];
