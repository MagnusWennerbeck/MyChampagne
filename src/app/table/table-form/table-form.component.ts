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

  formFilterValue: string = '';
  @Output() formFilterValueChange: EventEmitter<string> = new EventEmitter();

  // formScrollValue: number = 0;
  // @Output() formScrollValueChange: EventEmitter<number> = new EventEmitter();

  @Output() scrollToFirstRowEvent = new EventEmitter<void>();
  @Output() scrollToLastRowEvent = new EventEmitter<void>();
 
  // scrollToFirstRow() {
  //   this.scrollToFirstRowEvent.emit();
  // }

  // scrollToLastRow() {
  //   this.scrollToLastRowEvent.emit();
  // }
  constructor(private cdRef: ChangeDetectorRef) {}

  rowCount: number = 25;
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
