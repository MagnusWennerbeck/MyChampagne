import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableGridComponent } from '../table-grid/table-grid.component';

@Component({
  selector: 'table-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.css',
})
export class TableFormComponent implements AfterContentInit {
  title = 'TableFormComponent';

  @ViewChild(TableGridComponent) tableGridComponent!: TableGridComponent;
  @Output() formFilterValueChange: EventEmitter<string> = new EventEmitter();
  @Output() scrollToFirstRowEvent = new EventEmitter<void>();
  @Output() scrollToLastRowEvent = new EventEmitter<void>();
  formFilterValue: string = '';
  rowCount: number = 0;
  
  constructor(private cdRef: ChangeDetectorRef) {
    console.log('TableFormComponent:constructor() has started...');
  }

 
  ngAfterContentInit() {
    // Manuell förnyelse av vyen
    this.cdRef.detectChanges();
  }
  applyFilter(filterValue: string) {
    if (filterValue !== undefined) {
      this.formFilterValue = filterValue;
      console.log(
        'TableFormComponent:applyFilter() formFilterValue= ' +
          this.formFilterValue
      );
    } else {
      console.log(
        'TableFormComponent:applyFilter() formFilterValue= undefined '
      );
    }
    this.formFilterValueChange.emit(this.formFilterValue);
  }

  ngAfterViewInit() {
    if (this.tableGridComponent) {
      this.tableGridComponent.scrollToFirstRow();
      console.log('TableFormComponent:ngAfterViewInit() >>>>> FOUND');
    } else {
      console.log('TableFormComponent:ngAfterViewInit() >>>>> NOT FOUND');
    }
  }

  scrollToFirstRow() {
    this.scrollToFirstRowEvent.emit();

    // this.formScrollValue=1;
    // this.formScrollValueChange.emit(this.formScrollValue);

    if (this.tableGridComponent) {
      this.tableGridComponent.scrollToFirstRow();
    } else {
      console.log(
        'TableFormComponent:scrollToFirstRow() tableGridComponent ### not defined ' +
          this.tableGridComponent
      );
    }
  }

  scrollToLastRow() {
    this.scrollToLastRowEvent.emit();

    // this.formScrollValue=this.rowCount;
    // this.formScrollValueChange.emit(this.formScrollValue);

    if (this.tableGridComponent) {
      this.tableGridComponent.scrollToLastRow();
    } else {
      console.log(
        'TableFormComponent:scrollToLastRow() tableGridComponent ### not defined ' +
          this.tableGridComponent
      );
    }
  }

  printSelectedValues() {}
}
