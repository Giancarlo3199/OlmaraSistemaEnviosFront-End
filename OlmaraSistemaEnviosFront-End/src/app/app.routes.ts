import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Inicio } from './components/inicio/inicio';
import { seguridadGuard } from './guard/seguridad-guard';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { UsuarioFormComponent } from './components/usuario-component/usuario-form-component/usuario-form-component';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: Login },
   { path: 'inicio', component: Inicio, canActivate: [seguridadGuard] },
   {
  path: 'usuarios',
  component: UsuarioComponent,
  canActivate: [seguridadGuard],
  data: { roles: ['ADMIN'] }
},
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },

];
