import 'zone.js/node';

import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// Angular SSR / Vite ahora pasa un BootstrapContext que debes recibir
export default (context: BootstrapContext) => {
  return bootstrapApplication(App, config, context);
};
