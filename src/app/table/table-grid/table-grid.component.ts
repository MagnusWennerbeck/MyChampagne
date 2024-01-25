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

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {
    // Hämta data när komponenten initialiseras
    this.data = this.tableDataService.getData();
  }
}
