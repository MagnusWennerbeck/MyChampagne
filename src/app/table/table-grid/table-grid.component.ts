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
import {
  ColDef,
  GridApi,
  RowClickedEvent,
  createGrid,
} from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { GridOptions } from 'ag-grid-community';
// import { TableFormComponent } from '../table-form/table-form.component';
import { FormsModule } from '@angular/forms';
import { AllModules } from '@ag-grid-enterprise/all-modules'; // Importera AllModules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrService } from 'ngx-toastr';

// FUTURE
// import { ModuleRegistry } from '@ag-grid-community/core';
// import { SideBarModule } from '@ag-grid-enterprise/side-bar';

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
  gridContent: any[] = [];
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

  // ModuleRegistry.registerModules([ SideBarModule ]);  // FUTURE

  gridOptions: GridOptions = {
    isExternalFilterPresent: this.isExternalFilterPresent.bind(this),
    doesExternalFilterPass: this.doesExternalFilterPass.bind(this),
    // onRowDataUpdated: this.onLoadedData.bind(this),
    // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    // onGridReady: this.onGridReady.bind(this),
    suppressHorizontalScroll: true,
    alwaysShowHorizontalScroll: false,

    // suppressVerticalScroll: true,
    // sideBar=true
  };

  rowCount: number = 0;
  quickFilter: string | undefined;

  countBought: number = 0;
  countConsumed: number = 0;
  countSaldo: number = 0;
  selectedRow: any;
  public appMessage: string = '';

  // Constructor ..............................................................
  constructor(
    private mySqlService: MySqlService,
    private datePipe: DatePipe // private toastr: ToastrService
  ) {
    console.log('TableGridComponent:constructor() has started...');
  }

  // Utility methods ...........................................................
  private getRowCount() {
    this.rowCount = this.grid.api.getDisplayedRowCount();
    this.calculateAllSaldos();
    // console.log('TableGridComponent:getRowCount()  rowCount=', this.rowCount);
  }

  externaFilterVar: boolean | undefined;

  isExternalFilterPresent(): boolean {
    console.log('TableGridComponent:this.filterSaldoNotZero() >>>>>>>> #1');
    return this.externaFilterVar !== undefined;
  }

  doesExternalFilterPass(node: any): boolean {
    console.log('TableGridComponent:this.filterSaldoNotZero() >>>>>>>> #2');
    return node.data.Saldo2 > 0;
  }

  // GUI Event handlers ********************************************************

  // Button for filtering Saldo > 0
  filterSaldoNotZero() {
    this.externaFilterVar = true;
    this.grid.api.onFilterChanged();
    // this.gridApi.api.onFilterChanged();

    console.log('TableGridComponent:this.filterSaldoNotZero() >>>>>>>> #3');
  }

  // Radio options for how calculation of saldo shall be done
  currentOption = 'Bought';
  externalFilterChanged(option: string) {
    this.currentOption = option;
    this.grid.api.onFilterChanged();
    // this.gridApi.onFilterChanged();
    console.log(
      'TableGridComponent:externalFilterChanged()  option=  ',
      option
    );
  }

  // Callback methods related to quickFilter
  onQuickFilterChange(filterValue: string) {
    this.applyQuickFilter(filterValue);
    console.log(
      'TableGridComponent:onQuickFilterChange Quick filter changed: ',
      filterValue
    );
  }
  // Used in onQuickFilterChange()
  applyQuickFilter(filterValue: string) {
    this.grid.api.setGridOption('quickFilterText', filterValue);
    this.quickFilter = filterValue;
    this.getRowCount();
    console.log(
      'TableGridComponent:this.applyFilter()  >>>>> filterValue=  ',
      filterValue
    );
  }

  // Button for clearing the quickFilter textbox
  clearFilter() {
    this.quickFilter = '';
    this.grid.api.setGridOption('quickFilterText', '');
    // this.grid.api.resetQuickFilter();  // doesn't work
    this.getRowCount();
    console.log(
      'TableGridComponent:clearFilter() quickFilter= ',
      this.quickFilter
    );
  }

  // Callback for calculating saldo's
  calculateAllSaldos() {
    console.log('TableGridComponent:countSaldo() ');
    this.countBought = this.calculateBought();
    this.countConsumed = this.calculateConsumed();
    this.countSaldo = this.calculateSaldo();
  }
  calculateBought() {
    let sum = 0;
    this.grid.api.forEachNodeAfterFilter((node) => {
      const cellValue = node.data.Bought;
      if (!isNaN(cellValue)) {
        sum += parseFloat(cellValue);
      }
    });
    return sum;
  }
  calculateConsumed() {
    let sum = 0;
    this.grid.api.forEachNodeAfterFilter((node) => {
      const cellValue = node.data.Consumed;
      if (!isNaN(cellValue)) {
        sum += parseFloat(cellValue);
      }
    });
    return sum;
  }
  calculateSaldo() {
    let sum = 0;
    this.grid.api.forEachNodeAfterFilter((node) => {
      const cellValue = node.data.Saldo;
      if (!isNaN(cellValue)) {
        sum += parseFloat(cellValue);
      }
    });
    return sum;
  }

  // -------------------------------------------------------------------

  // AG grid methods ...........................................................
  ngOnInit(): void {
    console.log('TableGridComponent:ngOnInit() >>> START');
    // console.log('TableGridComponent:ngOnInit() >>> Grid Options:', this.gridOptions);
    this.gridOptions = {
      defaultColDef: {
        editable: true,
      },

      rowHeight: 25, // this is used for setting of the gridrows height

      suppressHorizontalScroll: true,
      alwaysShowHorizontalScroll: true,

      alwaysShowVerticalScroll: false,
      // scrollbarWidth: 0,

      // sideBar: true, // FUTURE
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

  // Event Listenernes ==========================================================

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

  private gridApi!: GridApi;
  onGridReady(params: any) {
    this.getRowCount();
    console.log('TableGridComponent:onGridReady()  rowCount=', this.rowCount);
    this.gridApi = params.api;
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

  onCellValueChanged(event: any) {
    const rowIndex = event.rowIndex;
    const columnHeader = event.column.getId();
    let newCellValue = event.newValue;
    const rowData = event.node.data;
    const rowId = rowData.Id;
    // Om det är en checkboxkolumn
    if (columnHeader === 'IsRose') {
      newCellValue = rowData.IsRose; // Hämta checkboxvärdet från datamodellen
      console.log(
        'columnHeader === IsRose - Checkbox value changed:',
        newCellValue
      );
    }
    console.log(
      'columnHeader=',
      columnHeader,
      'rowIndex=',
      rowIndex,
      'rowId=',
      rowId,
      'newCellValue=',
      newCellValue
    );

    // Uppdatera databasen
    this.updateDatabase(rowId, columnHeader, newCellValue);
  }

  private setColumnDefsBasedOnData(): void {
    // This is not used for now, but maybe in the future.
    if (this.gridContent.length > 0) {
      const firstRow = this.gridContent[0];
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
            // checkboxSelection: true,
            field: 'IsRose',
            width: 100,
            editable: true,
            cellRenderer: function (params: { value: number }) {
              return params.value === 1
                ? '<input type="checkbox" checked/>'
                : '<input type="checkbox"/>';
            },

            onCellClicked: (params: { data: { IsRose: any } }) => {
              params.data.IsRose = params.data.IsRose === 1 ? 0 : 1;
              console.log('Checkbox value changed:', params.data.IsRose);
              this.onCellValueChanged(params);
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
            valueFormatter: (params: { value: number }) => {
              return params.value ? params.value.toFixed(2) : '';
            },
          },
          {
            headerName: 'PriceSEK',
            field: 'PriceSEK',
            width: 110,
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: { value: number }) => {
              return params.value ? params.value.toFixed(2) : '';
            },
          },
          {
            headerName: 'BoughtWhen',
            field: 'BoughtWhen',
            filter: 'agDateColumnFilter',
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

  setGridHeight(height: number): void {
    // NOT REDY YET !!!!
    // const windowHeight =
    //   window.innerHeight ||
    //   document.documentElement.clientHeight ||
    //   document.body.clientHeight;
    // const gridElement = this.el.nativeElement.querySelector('.ag-root-wrapper');
    // // Justera höjden baserat på ditt behov, här sätts den till 80% av fönsterhöjden
    // const newHeight = windowHeight * 0.8;
    // this.renderer.setStyle(gridElement, 'height', `${newHeight}px`);
  }
  handleScrollToFirstRow() {
    console.log('TableGridComponent: onScrollToFirstRow() >>>> #1');
    this.scrollToFirstRow(); // Kontrollera att denna funktion anropas
    this.setGridHeight(300);
  }

  handleScrollToLastRow() {
    console.log('TableGridComponent: onScrollToLastRow() >>>> #2');
    this.scrollToLastRow(); // Kontrollera att denna funktion anropas
    this.setGridHeight(500);
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

  // =============================================================================
  // SELECT
  // =============================================================================
  private loadData(): void {
    console.log('TableGridComponent:loadData() - >>> START');

    this.mySqlService.getDataByMenuSelection(this.menuItemSelected).subscribe({
      next: (data) => {
        this.gridContent = data;
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

  // =============================================================================
  // UPDATE
  // =============================================================================
  updateDatabase(id: string, columnName: string, newValue: any) {
    this.mySqlService
      .updateDatabase(this.menuItemSelected, id, columnName, newValue)
      .subscribe((response) => {});
    console.log('id: ', id, 'columnName: ', columnName, 'newValue:', newValue);
  }

  // =============================================================================
  // ADD
  // =============================================================================
  addRow(event: any) {
    const newRowData = {};

    this.mySqlService.addRow(this.menuItemSelected, newRowData).subscribe(
      (response) => {
        console.log('Row added successfully:', response);
        // Hämta uppdaterad data om det behövs
        this.loadData();
      },
      (error) => {
        console.error('Error adding row:', error);
      }
    );

    // console.log('TableGridComponent: addRow() >>>> #100');

    // const newRow = {
    //   id: this.gridContent.length + 1,
    //   name: `Row ${this.gridContent.length + 1}`,
    //   value: `Value ${this.gridContent.length + 1}`,
    // };

    // this.grid.api.applyTransaction({ add: [newRow] });
  }

  private debug: boolean = true;
  // =============================================================================
  // DELETE
  // =============================================================================

  private Msg(msg: string) {
    console.log('***** MESSAGE: ', msg);
    this.appMessage = msg;
  }

  onRowClicked(event: RowClickedEvent): void {
    this.selectedRow = event.data;
    const rowIndex = this.selectedRow.rowIndex;
    const rowId = this.selectedRow.Id;
    console.log(
      'TableGridComponent: onRowClicked() >>>> #111 rowIndex= ',
      rowIndex,
      'rowIn= ',
      rowId
    );
  }

  public deleteRow(event: any) {
    console.log('TableGridComponent: deleteRow() >>>> #100'), event;

    if (this.selectedRow) {
      console.log('TableGridComponent: deleteRow() >>>> #200');
      const rowIndex = this.selectedRow.rowIndex;
      var rowId = this.selectedRow.Id;

      console.log(
        'TableGridComponent: deleteRow() >>>> #300 rowIndex= ',
        rowIndex,
        'rowIn= ',
        rowId
      );

      this.mySqlService.deleteRow(this.menuItemSelected, rowId).subscribe(
        (complete) => {
          console.log(
            'TableGridComponent: deleteRow() >>>>#400 Row deleted successfully:'
          );
          // this.loadData();
          // this.toastr.success('Row deleted successfully', 'Success');
        },
        (error) => {
          console.error(
            'TableGridComponent: deleteRow() >>>> #5 Error deleting row:',
            error
          );
          // this.toastr.error('Error deleting row', 'Error');
        }
      );
    } else {
      console.log('TableGridComponent: deleteRow() >>>> #999 no row selected');
    }

    this.Msg(
      `Record with Id=${rowId} was deleted from ${this.menuItemSelected} table `
    );

    this.loadData();
  }
}
