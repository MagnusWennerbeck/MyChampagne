import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TableFormComponent } from './table/table-form/table-form.component';
import { TableModule } from './table/table.module';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
       RouterOutlet, 
       TableModule, 
       TableFormComponent ],
    // styleUrls: ['./app.component.css', './header/header.component.css'],
    // imports: [RouterOutlet, HeaderComponent]

})
export class AppComponent {
  title = 'MyChampagnes';
}
