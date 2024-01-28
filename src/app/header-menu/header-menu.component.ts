import { Component, Output, EventEmitter } from '@angular/core';

// import { TableModule } from '../table/table.module';
// import { TableGridComponent } from '../table/table-grid/table-grid.component';
import { TableDataService } from '../table/table-grid/table-data.service';

@Component({
  selector: 'header-menu',
  standalone: true,
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent {
  title = 'Mina Champagner';

  @Output() menuItemSelected: EventEmitter<any> = new EventEmitter();

  constructor(private tableDataService: TableDataService) {} // Injicera TableDataService här

  handleMenuClick(menuItem: string): void {
    this.menuItemSelected.emit(menuItem);
  }

  handleButtonClick(): void {
    console.log('Button clicked in HeaderMenuComponent');
  }
}
