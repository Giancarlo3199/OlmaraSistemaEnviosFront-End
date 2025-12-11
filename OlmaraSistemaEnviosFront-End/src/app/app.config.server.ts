import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { JwtInterceptor } from './interceptor/jwt-interceptor'; // ajusta nombre/path si es necesario

import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    // Permite renderizado en servidor y registra las rutas que usará SSR
    provideServerRendering(withRoutes(serverRoutes)),

    // Registrar HttpClient en el contexto SSR + habilitar interceptores desde DI
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    // Registrar tu interceptor JWT también en SSR (para que SSR pueda realizar llamadas autenticadas si es necesario)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },

    // registrar JwtModule en SSR
   importProvidersFrom(
     JwtModule.forRoot({
       config: {
         tokenGetter: tokenGetter,
         allowedDomains: ['localhost:8801'],
         disallowedRoutes: ['http://localhost:8801/login/forget'],
       },
     })
   ),
  ],
};

// Merge: mantiene los providers del cliente (appConfig) y añade/override los del servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
