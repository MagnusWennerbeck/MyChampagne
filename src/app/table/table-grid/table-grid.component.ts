import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySqlService } from '../mysql.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, createGrid } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { GridOptions } from 'ag-grid-community';
import { TableFormComponent } from '../table-form/table-form.component';

@Component({
  selector: 'table-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule, TableFormComponent],
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css'],
  providers: [DatePipe],
})
export class TableGridComponent implements OnInit, OnChanges {
  title = 'TableGridComponent2';
  data: any[] = [];
  columnDefs: any[] = [];
  defaultColDef: ColDef = {
    filter: true,
  };

  gridOptions: any;

  @ViewChild('myGrid') grid!: AgGridAngular;

  rowCount: number = 0;

  // Constructor ..............................................................
  constructor(private mysqlService: MySqlService, private datePipe: DatePipe) {}

  @Input() menuItemSelected: string = '';
  @Input() formFilterValue: string = '';

  // onScrollToFirstRow() {
  //   // Åtgärder vid knapptryck för "I<<<"
  //   this.scrollToFirstRow();
  // }

  // onScrollToLastRow() {
  //   // Åtgärder vid knapptryck för ">>>I"
  //   this.scrollToLastRow();
  // }

  // scrollToFirstRow() {
  //   // Implementera scrollfunktion för första raden
  // }

  // scrollToLastRow() {
  //   // Implementera scrollfunktion för sista raden
  // }

  // Methods ...............................................................
  ngOnInit(): void {
    this.gridOptions = {
      defaultColDef: {
        editable: true,
      },

      onFirstDataRendered: this.onFirstDataRendered.bind(this),
      onGridReady: this.onGridReady.bind(this),

      suppressHorizontalScroll: true,
    };

    this.menuItemSelected = 'Wines';
    this.updateColumnDefs(this.menuItemSelected);
    this.loadData();

    // this.scrollToFirstRow(); // eller andra ngAfterViewInit-relaterade operationer
    // this.scrollToLastRow(); // eller andra ngAfterViewInit-relaterade operationer
  }
  ngAfterViewInit(): void {
    // Förutsättning: gridOptions är redan instansierat och grid är renderat
    // const gridOptions = this.agGrid.gridOptions;
    this.ensureLastRowVisible();
  }
  ensureLastRowVisible(): void {
    // if (this.gridOptions && this.gridOptions.api) {
    //   const lastRowIndex = this.rowCount - 1;
    //   // this.gridOptions.api.ensureIndexVisible(lastRowIndex, 'bottom');
    // }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('TableGridComponent:ngOnChanges >>> #1 ');

    this.updateColumnDefs(this.menuItemSelected);

    if (
      changes['menuItemSelected'] &&
      !changes['menuItemSelected'].firstChange
    ) {
      console.log('TableGridComponent:ngOnChanges >>> #2 ');
      this.loadData();

      console.log(
        'TableGridComponent:ngOnChanges() rowCount = ',
        this.rowCount
      );
      console.log('TableGridComponent:ngOnChanges >>> #3 ');
    }

    if (changes['formFilterValue']) {
      // const newFilterValue = changes['formFilterValue'].currentValue;
      this.formFilterValue = changes['formFilterValue'].currentValue;
      console.log(
        'TableGridComponent:ngOnChanges >>> #4 ',
        this.formFilterValue
      );
      this.scrollToLastRow();
    } else {
      console.log('TableGridComponent:ngOnChanges >>> #5 - No filter changes ');
    }
    console.log(
      'GridComponent:OnChanges() formFilterValue= ',
      this.formFilterValue
    );

    console.log('GridComponent:OnChanges() scrollToLastRow() klar ');
  }

  onFirstDataRendered(params: any) {
    this.rowCount = params.api.getDisplayedRowCount();
    console.log(`onFirstDataRendered() Antal rader: ${this.rowCount}`);
  }

  onGridReady(params: any) {
    this.rowCount = params.api.getDisplayedRowCount();
    console.log('onGridReady() Grid is ready!');
  }

  private loadData(): void {
    // console.log("TableGridComponent:loadData() - enter");
    this.mysqlService.getDataByMenuSelection(this.menuItemSelected).subscribe({
      next: (data) => {
        this.data = data;
        // Kontrollera om gridOptions och api är definierade innan du anropar getDisplayedRowCount
        // if (this.gridOptions && this.gridOptions.api) {
        //   // Uppdatera antalet rader efter att nya data har laddats
        //   // this.rowCount = this.gridOptions.getDisplayedRowCount();
        //   console.log(
        //     'TableGridComponent:loadData() - successful read from mySql:'
        //   );
        //   console.log(`Antal rader: ${this.rowCount}`);

        //   // Uppdatera titeln här efter att nya data har laddats
        //   this.title = this.menuItemSelected + ', rows: ' + this.rowCount;
        // }
        console.log(
          'TableGridComponent:loadData() - successful read from mySql:'
        );
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching complete');
      },
    });

    this.title = this.menuItemSelected + ', rows: ' + this.rowCount;
  }

  private setColumnDefs(): void {
    // Definiera dina kolumndefinitioner baserat på datan (OBS! ingen bra metod)
    if (this.data.length > 0) {
      const firstRow = this.data[0];
      this.columnDefs = Object.keys(firstRow).map((key) => ({
        headerName: key,
        field: key,
      }));
    }
  }
  // Metod för att dynamiskt uppdatera kolumndefinitioner baserat på menyval
  private updateColumnDefs(menuSelection: string): void {
    // console.log("menuSelection="+menuSelection);

    switch (menuSelection) {
      case 'Wines':
        this.columnDefs = [
          { headerName: 'Id', field: 'Id', editable: false, width: 75 },

          // { headerName: 'ProdId', field: 'ProdId', width: 100 },
          { headerName: 'Producer', field: 'Producer', width: 150 },

          { headerName: 'Wine', field: 'Wine', width: 200 },

          { headerName: 'PN', field: 'PN', width: 75 },
          { headerName: 'PM', field: 'PM', width: 75 },
          { headerName: 'CH', field: 'CH', width: 75 },

          { headerName: 'Bought', field: 'Bought', width: 100 },
          { headerName: 'Consumed', field: 'Consumed', width: 125 },
          { headerName: 'Saldo', field: 'Saldo', width: 100 },

          // { headerName: 'PriceEUR', field: 'PriceEUR', width: 125 },
          // { headerName: 'PriceSEK', field: 'PriceSEK', width: 125 },
          {
            headerName: 'PriceEUR',
            field: 'PriceEUR',
            width: 150,
            valueFormatter: (params: { value: number }) => {
              // Formatera talet med 2 decimaler
              return params.value ? params.value.toFixed(2) : '';
            },
          },
          {
            headerName: 'PriceSEK',
            field: 'PriceSEK',
            width: 150,
            valueFormatter: (params: { value: number }) => {
              // Formatera talet med 2 decimaler
              return params.value ? params.value.toFixed(2) : '';
            },
          },
          {
            headerName: 'BoughtWhen',
            field: 'BoughtWhen',
            cellRenderer: (data: { value: string | number | Date }) => {
              return data.value
                ? new Date(data.value).toLocaleDateString()
                : '';
            },
            width: 150,
          },
          { headerName: 'BoughtWhere', field: 'BoughtWhere', width: 200 },

          { headerName: 'Comment', field: 'Comment', width: 200 },
          {
            headerName: 'LastUpdated',
            field: 'LastUpdated',
            editable: false,
            cellRenderer: (data: { value: string | number | Date }) => {
              return data.value
                ? new Date(data.value).toLocaleDateString()
                : '';
            },
            width: 150,
          },
        ];
        break;

      case 'Producers':
        this.columnDefs = [
          { headerName: 'Id', field: 'Id', editable: false },
          { headerName: 'Producer', field: 'Producer' },
          { headerName: 'Village', field: 'Village' },
          { headerName: 'Region', field: 'Region' },
          { headerName: 'Email', field: 'Email' },
          { headerName: 'Web', field: 'Web' },
        ];
        break;

      case 'Notes':
        this.columnDefs = [
          { headerName: 'Id', field: 'Id' },
          // { headerName: 'Datum', field: 'Datum' },
          {
            headerName: 'Datum',
            field: 'Datum',
            cellRenderer: (data: { value: string | number | Date }) => {
              return data.value
                ? new Date(data.value).toLocaleDateString()
                : '';
            },
            width: 125,
          },
          { headerName: 'Location', field: 'Location', width: 125 },
          { headerName: 'Company', field: 'Company', width: 125 },
          { headerName: 'Producer', field: 'Producer', width: 200 },
          { headerName: 'Wine', field: 'Wine', width: 250 },
          { headerName: 'TastingNote', field: 'TastingNote', width: 500 },
          { headerName: 'Score', field: 'Score', width: 100 },
          { headerName: 'Comment', field: 'Comment', width: 300 },
          // { headerName: 'BuyMore', field: 'BuyMore', width: 100  },
          // { headerName: 'LastUpdated', field: 'LastUpdated', width: 250  },
          {
            headerName: 'LastUpdated',
            field: 'LastUpdated',
            cellRenderer: (data: { value: string | number | Date }) => {
              return data.value
                ? new Date(data.value).toLocaleDateString()
                : '';
            },
            width: 150,
          },
        ];
        break;

      default:
        // Standard kolumndefinitioner om inget matchar
        this.columnDefs = [
          { headerName: 'Id', field: 'id' },
          { headerName: 'Column 1', field: 'colData 1' },
          { headerName: 'Column 2', field: 'colData 2' },
          { headerName: 'Column 3', field: 'colData 3' },
          { headerName: 'Column 4', field: 'colData 4' },
          { headerName: 'Column 5', field: 'colData 5' },
          { headerName: 'Column 6', field: 'colData 6' },
          { headerName: 'Column 7', field: 'colData 7' },
          { headerName: 'Column 8', field: 'colData 8' },
          { headerName: 'Column 9', field: 'colData 9' },
          { headerName: 'Column 10', field: 'colData 10' },

          // ... lägg till fler kolumndefinitioner vid behov
        ];
        break;
    }
  }

  handleScrollToFirstRow() {
    console.log('TableGridComponent: onScrollToFirstRow() >>>> #1');
    this.scrollToFirstRow(); // Kontrollera att denna funktion anropas
  }

  handleScrollToLastRow() {
    console.log('TableGridComponent: onScrollToLastRow() >>>> #2');
    this.scrollToLastRow(); // Kontrollera att denna funktion anropas
  }

  scrollToFirstRow() {
    console.log('TableGridComponent: scrollToFirstRow()');
    if (this.gridOptions) {
      const lastRowIndex = 1;
      this.grid.api.ensureIndexVisible(lastRowIndex, 'bottom');
      console.log(
        'TableGridComponent:scrollToFirstRow()  gridOption is defined lastRowIndex= ',
        lastRowIndex
      );
    } else {
      console.log(
        'TableGridComponent:scrollToFirstRow()  gridOption is NOT defined'
      );
    }
  }

  scrollToLastRow() {
    console.log('TableGridComponent: scrollToLastRow() started)');
    if (this.gridOptions) {
      const lastRowIndex = this.rowCount - 1;
      this.grid.api.ensureIndexVisible(lastRowIndex, 'bottom');
      console.log(
        'TableGridComponent:scrollToLastRow()  gridOption is defined lastRowIndex= ',
        lastRowIndex
      );
    } else {
      console.log(
        'TableGridComponent:scrollToLastRow()  gridOption is NOT defined'
      );
    }
  }
}
