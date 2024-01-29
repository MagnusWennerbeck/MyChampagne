import {
  Component,
  Input,
  NgModule,
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
// import { TableFormComponent } from '../table-form/table-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'table-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule, FormsModule],
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
    cellStyle: {
      'padding-left': '15px',
      'padding-rigth': '0px',
      textAlign: 'left',
    },
    headerClass: 'header-left',
    editable: true,
  };

  @ViewChild('myGrid') grid!: AgGridAngular;
  @ViewChild('quickFilter') filter!: AgGridAngular;
  @Input() menuItemSelected: string = ''; // input from HeadermenyComponent, triggered when user changes menu item
  @Input() formFilterValue: string = ''; // old solution with TableFormComonent - not used anymore

  gridOptions: any;
  rowCount: number = 0;
  quickFilter: string | undefined;

  // Constructor ..............................................................
  constructor(private mysqlService: MySqlService, private datePipe: DatePipe) {
    console.log('TableGridComponent:constructor() has started...');
  }

  // Utility methods ...........................................................
  private getRowCount() {
    this.rowCount = this.grid.api.getDisplayedRowCount();
    // console.log('TableGridComponent:getRowCount()  rowCount=', this.rowCount);
  }

  applyQuickFilter(filterValue: string) {
    this.grid.api.setGridOption('quickFilterText', filterValue);
    console.log(
      'TableGridComponent:this.applyFilter()  filterValue=  ',
      filterValue
    );
  }
  onQuickFilterChange(filterValue: string) {
    console.log(
      'TableGridComponent:onQuickFilterChange Quick filter changed: ',
      filterValue
    );
    this.applyQuickFilter(filterValue);
  }
  clearFilter() {
    this.grid.api.setGridOption('quickFilterText', '');
    this.quickFilter = '';
    console.log(
      'TableGridComponent:clearFilter() quickFilter= ',
      this.quickFilter
    );
  }

  countSaldo() {
    console.log('TableGridComponent:countSaldo() calling onGridReady()');
    this.onGridReady(null);
  }

  // AG grid methods ...........................................................

  // Methods ...............................................................
  ngOnInit(): void {
    console.log('TableGridComponent:ngOnInit() >>> START');
    this.gridOptions = {
      defaultColDef: {
        editable: true,
      },
      rowHeight: 25,

      // onRowDataUpdated: this.onLoadedData.bind(this),
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
      // onGridReady: this.onGridReady.bind(this),

      suppressHorizontalScroll: true,
    };

    this.menuItemSelected = 'Wines';
    this.updateColumnDefs(this.menuItemSelected);
    this.loadData();
    console.log('TableGridComponent:ngOnInit() >>> END');
  }

  ngAfterViewInit(): void {
    console.log('TableGridComponent:ngAfterViewInit()');
    // Förutsättning: gridOptions är redan instansierat och grid är renderat
    // this.ensureLastRowVisible();
  }

  ensureLastRowVisible(): void {
    console.log('TableGridComponent:ensureLastRowVisible() #1');
    if (this.gridOptions && this.gridOptions.api) {
      const lastRowIndex = this.rowCount - 1;
      console.log(
        'TableGridComponent:ensureLastRowVisible() #2 lastRowIndex= '
      ),
        lastRowIndex;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('TableGridComponent:ngOnChanges()  >>> START ');

    if (
      changes['menuItemSelected'] &&
      !changes['menuItemSelected'].firstChange
    ) {
      console.log(
        'TableGridComponent:ngOnChanges()  >>> MenuSelectionChanged ',
        this.menuItemSelected
      );
      this.updateColumnDefs(this.menuItemSelected);
      this.loadData();
    }

    if (changes['quickFilter']) {
      this.quickFilter = changes['quickFilter'].currentValue;
      // this.applyQuickFilter(this.quickFilter)
      console.log(
        'TableGridComponent:ngOnChanges >>> formFilterValue was changed ',
        this.quickFilter
      );
    }

    console.log('TableGridComponent:ngOnChanges()  >>> END ');
  }

  onGridReady(params: any) {
    this.getRowCount();
    console.log('TableGridComponent:onGridReady()  rowCount=', this.rowCount);
  }

  onRowDataChanged(params: any) {
    this.getRowCount();
    console.log(
      'TableGridComponent:onRowDataChanged()  rowCount=',
      this.rowCount
    );
  }

  onFirstDataRendered(params: any) {
    this.getRowCount();
    console.log(
      'TableGridComponent:onFirstDataRendered()  rowCount=',
      this.rowCount
    );
  }

  onStateUpdated(params: any) {
    this.getRowCount();
    console.log(
      'TableGridComponent:onStateUpdated()  rowCount=',
      this.rowCount
    );
  }

  private loadData(): void {
    console.log('TableGridComponent:loadData() - >>> START');

    this.mysqlService.getDataByMenuSelection(this.menuItemSelected).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching complete');
      },
    });

    console.log('TableGridComponent:loadData() - >>> END');
  }

  private setColumnDefsBasedOnData(): void {
    // This is not used for now, but maybe in the future.
    if (this.data.length > 0) {
      const firstRow = this.data[0];
      this.columnDefs = Object.keys(firstRow).map((key) => ({
        headerName: key,
        field: key,
      }));
    }
  }

  private updateColumnDefs(menuSelection: string): void {
    switch (menuSelection) {
      case 'Wines':
        this.columnDefs = [
          { headerName: 'Id', field: 'Id', editable: false, width: 75 },
          { headerName: 'Producer', field: 'Producer', width: 200 },
          { headerName: 'Wine', field: 'Wine', width: 200 },
          {
            headerName: 'PN',
            field: 'PN',
            width: 75,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'PM',
            field: 'PM',
            width: 75,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'CH',
            field: 'CH',
            width: 75,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'IsRose',
            field: 'IsRose',
            width: 100,
            // checkboxSelection: true,
            cellRenderer: function (params: { value: number }) {
              return params.value === 1
                ? '<input type="checkbox" checked/>'
                : '<input type="checkbox"/>';
            },
          },
          // {
          //   headerName: 'IsVintage',
          //   field: 'IsVintage',
          //   width: 75,
          //   // checkboxSelection: true,
          //   cellRenderer: function (params: { value: number }) {
          //     return params.value === 1
          //       ? '<input type="checkbox" checked/>'
          //       : '<input type="checkbox"/>';
          //   },
          // },
          {
            headerName: 'Vintage',
            field: 'Vintage',
            width: 100,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'Bought',
            field: 'Bought',
            width: 100,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'Consumed',
            field: 'Consumed',
            width: 120,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'Saldo',
            field: 'Saldo',
            width: 90,
            filter: 'agNumberColumnFilter',
          },
          {
            headerName: 'PriceEUR',
            field: 'PriceEUR',
            width: 110,
            filter: 'agNumberColumnFilter',
            // headerStyle: { textAlign: 'center' },
            // cellStyle: { textAlign: 'center' },
            valueFormatter: (params: { value: number }) => {
              return params.value ? params.value.toFixed(2) : '';
            },
          },
          {
            headerName: 'PriceSEK',
            field: 'PriceSEK',
            width: 110,
            filter: 'agNumberColumnFilter',
            // headerStyle: { textAlign: 'center' },
            // cellStyle: { textAlign: 'center' },
            valueFormatter: (params: { value: number }) => {
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
