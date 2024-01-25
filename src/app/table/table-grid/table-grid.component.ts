import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataService } from './table-data.service';

@Component({
  selector: 'table-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-grid.component.html',
  styleUrl: './table-grid.component.css'
})
export class TableGridComponent implements OnInit {
  
  title = "TableGridComponent"
  data: any[] = []; 
  rowData: any[] = [];
  columnDefs: any[] = [];

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {

    // Hämta data när komponenten initialiseras
    this.data = this.tableDataService.getData();

    // Lägg till en prenumeration på menyvalet
    this.tableDataService.menuItemSelected.subscribe((menuItem: string) => {
      
      // Hämta data baserat på menyvalet
      this.rowData = this.tableDataService.getDataByMenuSelection(menuItem);

      console.log(this.rowData);
      
      // Uppdatera kolumndefinitioner om nödvändigt
      this.columnDefs = Object.keys(this.rowData[0]).map((key) => ({
        headerName: key,
        field: key,
      }));
    });


  }
}
