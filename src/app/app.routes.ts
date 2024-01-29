import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { TableGridComponent } from './table/table-grid/table-grid.component';

const routes: Routes = [
  { path: '', component: HeaderMenuComponent },
  { path: 'grid', component: TableGridComponent, canActivate: [AuthGuard] }, // Replace with your AuthGuard
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule],
//   })

export const RoutesService: Routes = [
  { path: '', component: HeaderMenuComponent }, // Rutt för startsidan (ingen specifik URL)
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, // Skyddad
];
