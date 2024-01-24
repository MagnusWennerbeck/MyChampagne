import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFormComponent } from './table-form/table-form.component'; // Se till att sökvägen är korrekt



@NgModule({
  declarations: [] ,
  imports: [
    CommonModule,
    TableFormComponent],
  exports: [
    TableFormComponent,
      // Andra komponenter eller moduler som du vill göra tillgängliga för andra moduler
    ],

})
export class TableModule { }


