import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment'
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

// if (environment.production) {
//   enableProdMode();
// }


bootstrapApplication(AppComponent).catch((err) => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppComponent)
//   .catch((err) => console.error(err));

