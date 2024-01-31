import { Component, NgModule, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { TableModule } from './table/table.module';
import { TableGridComponent } from './table/table-grid/table-grid.component';
import { AuthService } from './auth.service';
import { RoutesService } from './app.routes'; // Var noga med att inkludera AppRoutingModule
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';


const routes: Routes = [
  { path: '', component: HeaderMenuComponent },
  { path: 'grid', component: TableGridComponent, canActivate: [AuthGuard] }, // Use your AuthGuard
];


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    TableModule,
    HeaderMenuComponent,
    TableGridComponent,
    // BrowserModule,
    // BrowserAnimationsModule,
   
  ],
})
export class AppComponent {
  password = '';
  title = 'MyChampagnes';
  menuItemSelected: any; // variable for selected meny item, passed to TableGridComponent
  formFilterValue: any; // variable for form filter value, passed to TableGridComponent
  formScrollValue: any; // variable for form button value, passed to TableGridComponent
  @ViewChild(TableGridComponent) tableGrid!: TableGridComponent;

  constructor(public authService: AuthService) {
    console.log('AppComponent:constructor() has started...');
    // login(): void {
    //   this.authService.login(this.password);
    // }
  }

  login() {}
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

  handleScrollToFirstRow(): void {
    console.log(
      'AppComponent:handleScrollToFirstRow() Event was triggered!!!! ###1'
    );
    this.tableGrid.handleScrollToFirstRow();
  }
  handleScrollToLastRow(): void {
    console.log(
      'AppComponent:handleScrollToLastRow() Event was triggered!!!! ###2'
    );
    this.tableGrid.handleScrollToLastRow();
  }
}
function login() {
  throw new Error('Function not implemented.');
}

@NgModule({
  declarations: [],
  imports: [FormsModule, AppComponent],
})
export class AppModule {}
