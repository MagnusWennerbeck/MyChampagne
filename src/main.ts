import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
bootstrapApplication(AppComponent)

// platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch((err) => console.error(err));
