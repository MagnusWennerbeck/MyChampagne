import { Component, Output, EventEmitter } from '@angular/core';

import { TableModule } from '../table/table.module';
import { TableGridComponent } from '../table/table-grid/table-grid.component';
import { TableDataService } from '../table/table-grid/table-data.service';

@Component({
  selector: 'header-menu',
  standalone: true,
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {
  
  title="Mina Champagner";

  // Konstruktor
  constructor(private tableDataService: TableDataService) {} // Injicera TableDataService här

  @Output() menuItemSelected: EventEmitter <any> = new EventEmitter();

    handleMenuClick(menuItem: string): void {
 
      this.menuItemSelected.emit(menuItem);
      
      console.log('HeaderMenuComponent: item selected:', menuItem);

       // Anropa metoden i TableDataService med menyvalet
       const data = this.tableDataService.getDataByMenuSelection(menuItem);
       

       // Skicka ut data till andra komponenter eller gör önskad hantering
       console.log('Menu item selected:', menuItem, 'Data:', data);
    }

    handleButtonClick(): void {
      console.log('Button clicked in HeaderMenuComponent');
    }

}
