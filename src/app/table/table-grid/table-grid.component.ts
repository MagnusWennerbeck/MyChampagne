import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { TableDataService } from './table-data.service';
import { MySqlService } from '../mysql.service';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'table-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './table-grid.component.html',
  styleUrl: './table-grid.component.css'
})
export class TableGridComponent implements OnInit {
  
  title = "TableGridComponent"

  // data: any;
  data: any[] = [];
  columnDefs: any[] = [];

  defaultColDef: ColDef = {
    filter: true
  }


  
  
// Constructor ..............................................................
  //  constructor() {}
  // constructor(private tableDataService: TableDataService) {
  // constructor(private mysqlService: MySqlService, private tableDataService: TableDataService) {
  constructor(private mysqlService: MySqlService) { }

  @Input() menuItemSelected: string = '';

  // Methods ...............................................................
  ngOnInit(): void {

    console.log("table-grid: ngOnInit()");
    
    this.menuItemSelected="Wines";
    this.updateColumnDefs(this.menuItemSelected);
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('TableGridComponent:ngOnChanges() menuItemSelected = ', this.menuItemSelected);
    this.updateColumnDefs(this.menuItemSelected);
    if (changes['menuItemSelected'] && !changes['menuItemSelected'].firstChange) {
       this.loadData();
     }  
  }

  private loadData(): void {

    console.log("TableGridComponent:loadData() - enter");
;
    this.mysqlService.getDataByMenuSelection(this.menuItemSelected).subscribe({
      next: (data) => {
        this.data = data;
        console.error('this.data = data;');
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching complete');
      },
    });

    console.log("TableGridComponent:loadData() - exit");
    console.log(this.data);
  }

  private setColumnDefs(): void {
    console.log("TableGridComponent:setColumnDefs()");
    // Definiera dina kolumndefinitioner baserat på datan (OBS! ingen bra metod)
    if (this.data.length > 0) {
      const firstRow = this.data[0];
      this.columnDefs = Object.keys(firstRow).map((key) => ({
        headerName: key,
        field: key,
      }));
    }

  }
 // Metod för att dynamiskt uppdatera kolumndefinitioner baserat på menyval
 private updateColumnDefs(menuSelection: string): void {
  
  // console.log("menuSelection="+menuSelection);

  switch (menuSelection) {

    case 'Wines':
      this.columnDefs = [
        { headerName: 'Id', field: 'Id', width: 75 },
        { headerName: 'Wine', field: 'Wine', width: 250  },
        { headerName: 'PN', field: 'PN', width: 75 },
        { headerName: 'PM', field: 'PM', width: 75  },
        { headerName: 'CH', field: 'CH', width: 75  },
        { headerName: 'BoughtWhere', field: 'BoughtWhere', width: 200  },
        // ... lägg till fler kolumndefinitioner vid behov
      ];
      break;

    case 'Producers':
      this.columnDefs = [
        { headerName: 'Id', field: 'Id' },
        { headerName: 'Producer', field: 'Producer' },
        { headerName: 'Village', field: 'Village' },
        { headerName: 'Region', field: 'Region' },
        { headerName: 'Email', field: 'Email' },
        { headerName: 'Web', field: 'Web' },
        // ... lägg till fler kolumndefinitioner vid behov
      ];
      break;

      case 'Notes':
        this.columnDefs = [
          { headerName: 'Id', field: 'id' },
          { headerName: 'Date', field: 'date' },
          { headerName: 'Notes', field: 'notes' },
          // ... lägg till fler kolumndefinitioner vid behov
        ];
        break;

    default:
      // Standard kolumndefinitioner om inget matchar
      this.columnDefs = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'Column 1', field: 'colData 1' },
        { headerName: 'Column 2', field: 'colData 2' },
        { headerName: 'Column 3', field: 'colData 3' },
        { headerName: 'Column 4', field: 'colData 4' },
        { headerName: 'Column 5', field: 'colData 5' },
        { headerName: 'Column 6', field: 'colData 6' },
        { headerName: 'Column 7', field: 'colData 7' },
        { headerName: 'Column 8', field: 'colData 8' },
        { headerName: 'Column 9', field: 'colData 9' },
        { headerName: 'Column 10', field: 'colData 10' },

        // ... lägg till fler kolumndefinitioner vid behov
      ];
      break;
  }
}

}
