import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// import { ToastrModule } from 'ngx-toastr';

// ToastrModule.forRoot({
//   timeOut: 3000, // Tid i millisekunder för hur länge meddelandet ska visas
//   positionClass: 'toast-top-right', // Placering av toast-meddelandet på skärmen
//   preventDuplicates: true, // Förhindra dubbletter
// });
bootstrapApplication(AppComponent).catch((err) => console.error(err));
