import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Inicio } from './components/inicio/inicio';
import { seguridadGuard } from './guard/seguridad-guard';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { UsuarioFormComponent } from './components/usuario-component/usuario-form-component/usuario-form-component';
import { CiudadComponent } from './components/ciudad-component/ciudad-component';
import { CiudadFormComponent } from './components/ciudad-component/ciudad-form-component/ciudad-form-component';
import { EmpresaTransporteComponent } from './components/empresa-transporte-component/empresa-transporte-component';
import { EmpresaTransporteFormComponent } from './components/empresa-transporte-component/empresa-transporte-form-component/empresa-transporte-form-component';

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

    {
  path: 'ciudades',
  component: CiudadComponent,
  canActivate: [seguridadGuard],
  data: { roles: ['ADMIN'] }
    },
  { path: 'ciudades/nuevo', component: CiudadFormComponent },
  { path: 'ciudades/editar/:id', component: CiudadFormComponent },
    {
  path: 'empresa-transporte',
  component: EmpresaTransporteComponent,
  canActivate: [seguridadGuard],
},
{
  path: 'empresa-transporte/nuevo',
  component: EmpresaTransporteFormComponent
},
{
  path: 'empresa-transporte/editar/:id',
  component: EmpresaTransporteFormComponent
}

];
