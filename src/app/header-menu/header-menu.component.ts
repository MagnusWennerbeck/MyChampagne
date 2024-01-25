import { Component, Output, EventEmitter } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'header-menu',
  standalone: true,
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {
  
  title="Mina Champagner";

  @Output() menuItemSelected: EventEmitter <any> = new EventEmitter();

    handleMenuClick(menuItem: string): void {

      this.menuItemSelected.emit(menuItem);

      console.log('HeaderMenuComponent: item selected:', menuItem);
    }

    handleButtonClick(): void {
      console.log('Button clicked in HeaderMenuComponent');
    }

}
