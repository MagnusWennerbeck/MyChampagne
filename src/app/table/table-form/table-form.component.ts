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

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterContentInit() {
    // Manuell förnyelse av vyen
    this.cdRef.detectChanges();
  }

  @ViewChild(TableGridComponent) tableGridComponent!: TableGridComponent;

  formFilterValue: string = '';
  @Output() formFilterValueChange: EventEmitter<string> = new EventEmitter();

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
    console.log('ngAfterViewInit() är körd');
    console.log('TableFormComponent: ngAfterViewInit', this.tableGridComponent);
  }

  scrollToFirstRow() {
    if (this.tableGridComponent) {
      this.tableGridComponent.scrollToFirstRow();
    } else {
      console.log(
        'scrollToFirstRow() tableGridComponent not defined ' +
          this.tableGridComponent
      );
    }
  }

  scrollToLastRow() {
    if (this.tableGridComponent) {
      this.tableGridComponent.scrollToLastRow();
    } else {
      console.log(
        'scrollToLastRow() tableGridComponent not defined ' +
          this.tableGridComponent
      );
    }
  }

  printSelectedValues() {}
}
