import {
  Component,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
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
export class TableFormComponent {
  title = 'TableFormComponent';

  formFilterValue: string = '';
  @Output() filterValueChange: EventEmitter<string> = new EventEmitter();

  //  @Output() formFilterValue: EventEmitter<any> = new EventEmitter();

  scrollToFirstRow() {}

  scrollToLastRow() {}

  applyFilter(filterValue: string) {
    if (filterValue !== undefined) {
      this.formFilterValue = filterValue;
      console.log(
        'TableFormComponent:applyFilter() formFilterValue= ' +
          this.formFilterValue
      );
    } else {
      console.log(
        'TableFormComponent:applyFilter() formFilterValue= ' + filterValue
      );
    }
    this.filterValueChange.emit(this.formFilterValue);
  }

  printSelectedValues() {}
}
