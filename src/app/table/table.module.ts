import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TableGridComponent } from './table-grid/table-grid.component';
// import { TableDataService } from './table-grid/table-data.service';
import { MySqlService } from './mysql.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [] ,
  imports: [
    CommonModule,
    TableGridComponent,
    HttpClientModule,

  ],
  exports: [
      TableGridComponent,
      HttpClientModule,
    
    ],
    // providers: [TableDataService], // Inkludera TableDataService här
    providers: [MySqlService], // Inkludera tjänst för att producera data

})
export class TableModule { }


