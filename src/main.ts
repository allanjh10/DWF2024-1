import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.min';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
