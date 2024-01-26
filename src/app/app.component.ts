import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { TableModule } from './table/table.module';
import { TableGridComponent } from './table/table-grid/table-grid.component';
import { TableFormComponent } from './table/table-form/table-form.component';
import { TableListComponent } from './table/table-list/table-list.component';
import { TableSelectorComponent } from './table/table-selector/table-selector.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
       RouterOutlet, 
       CommonModule,

       TableModule, 
       HeaderMenuComponent,
       TableGridComponent

    ],

})
export class AppComponent {
  
  title = 'Angular-Lab';

  menuItemSelected: any;  // variable for selected meny item

  handleMenuItemSelected(menuItem: string): void {
    
    this.menuItemSelected=menuItem;

    console.log('AppComponent: menu item clicked =', menuItem);

  };

  handleButtonClick(): void {
    console.log('Button clicked in AppComponent');
  }

}
