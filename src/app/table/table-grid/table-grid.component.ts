import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
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
/*   rowData: any[] = [];
  columnDefs: any[] = []; */

//  constructor() {}
  constructor(private tableDataService: TableDataService) {}

  @Input() menuItemSelected: string = '';

  ngOnChanges(changes: SimpleChanges): void {

    console.log('table-grid: ngOnChanges() menuItemSelected = ', this.menuItemSelected);

    this.data = this.tableDataService.getDataByMenuSelection(this.menuItemSelected);
  
  }

  ngOnInit(): void {

    console.log("table-grid: OnInit()");

  }
}
