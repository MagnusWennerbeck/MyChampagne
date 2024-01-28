import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { TableModule } from './table/table.module';
import { TableGridComponent } from './table/table-grid/table-grid.component';
import { TableFormComponent } from './table/table-form/table-form.component';

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
    TableGridComponent,
    TableFormComponent,
  ],
})
export class AppComponent {
  title = 'MyChampagnes';
  menuItemSelected: any; // variable for selected meny item, passed to TableGridComponent
  formFilterValue: any; // variable for form filter value, passed to TableGridComponent

  handleMenuItemSelected(menuItem: string): void {
    this.menuItemSelected = menuItem;
    // console.log(
    //   'AppComponent:handleMenuItemSelected() menu item clicked =',
    //   this.menuItemSelected
    // );
  }

  handleFormFilterChange(filterValue: string): void {
    this.formFilterValue = filterValue;
    // console.log(
    //   'AppComponent:handleFormFilterChange() formFilterValue =',
    //   this.formFilterValue
    // );
  }
}
