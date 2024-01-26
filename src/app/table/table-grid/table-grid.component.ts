import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataService } from './table-data.service';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'table-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './table-grid.component.html',
  styleUrl: './table-grid.component.css'
})
export class TableGridComponent implements OnInit {
  
  title = "TableGridComponent"

  data: any;
  columnDefs: any[] = [];

// Constructor ..............................................................
  //  constructor() {}
  constructor(private tableDataService: TableDataService) {}

  @Input() menuItemSelected: string = '';

  // Methods ...............................................................
  ngOnInit(): void {

    console.log("table-grid: OnInit()");

  }
  ngOnChanges(changes: SimpleChanges): void {

    console.log('table-grid: ngOnChanges() menuItemSelected = ', this.menuItemSelected);


    // if (changes.menuItemSelected && !changes.menuItemSelected.firstChange) {
      this.loadData();
    // } -- varför fungerar inte denna kod????
  
  }
  private loadData(): void {
    this.data = this.tableDataService.getDataByMenuSelection(this.menuItemSelected);
    this.setColumnDefs(); // Definiera kolumndefinitioner baserat på datan
  }

  private setColumnDefs(): void {
    // Definiera dina kolumndefinitioner baserat på datan
    if (this.data.length > 0) {
      const firstRow = this.data[0];
      this.columnDefs = Object.keys(firstRow).map((key) => ({
        headerName: key,
        field: key,
      }));
    }
  }


}
