import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 {
    path: 'usuarios/editar/:id',
    renderMode: RenderMode.Server 
  },
  {
    path: 'ciudades/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'empresa-transporte/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'envios/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
