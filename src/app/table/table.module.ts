import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableFormComponent } from './table-form/table-form.component'; 
import { TableGridComponent } from './table-grid/table-grid.component';
import { TableDataService } from './table-grid/table-data.service';


@NgModule({
  declarations: [] ,
  imports: [
    CommonModule,
    TableFormComponent,
    TableGridComponent
  ],
  exports: [
    TableFormComponent,
    TableGridComponent
    ],
    providers: [TableDataService], // Inkludera TableDataService här

})
export class TableModule { }


