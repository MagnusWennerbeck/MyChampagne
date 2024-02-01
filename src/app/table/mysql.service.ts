import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MySqlService {
  private apiUrl = 'http://localhost:3000/api/'; // Uppdatera URL:en enligt din server

  private rowCountSubject = new BehaviorSubject<number>(0);
  rowCount$ = this.rowCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // =============================================================================
  // SELECT
  // =============================================================================
  getDataByMenuSelection(menuSelection: string): Observable<any[]> {
    const url = `${this.apiUrl}tables/${menuSelection}`;
    console.log('mySqlService: getDataByMenuSelection() ', url);
    return this.http.get<any[]>(url);
  }

  // updateDatabase2(
  //   id: string,
  //   columnHeader: string,
  //   value: string
  // ): Observable<any[]> {
  //   const updateUrl = `http://localhost:3000/api/Wines/updateCell/${wineId}`;

  //   return response;
  // }

  // =============================================================================
  // UPDATE
  // =============================================================================
  updateDatabase(
    table: string,
    id: string,
    columnHeader: string,
    value: string
  ): Observable<any> {
    // const updateUrl = `http://localhost:3000/api/${table}/updateCell/${id}`;

    const url = `${this.apiUrl}tables/${table}/updateCell/${id}`;

    // Skicka förfrågan och använd map-operatorn för att hantera svaret
    return this.http
      .put(url, { columnName: columnHeader, newValue: value })
      .pipe(
        map((response: any) => {
          if (response.success) {
            // Uppdateringen lyckades
            console.log(response.message);
          } else {
            // Uppdateringen misslyckades
            console.error(response.message);
          }

          return response; // Returnera svaret för vidare hantering om det behövs
        })
      );
  }
  // =============================================================================
  // ADD
  // =============================================================================
  addRow(tableName: string, id: number): Observable<any> {
    const url = `${this.apiUrl}tables/${tableName}/addRow`;
    console.log('mySqlService:addRow()', url);
    return this.http.post<any>(url, { table: tableName, id: id });
  }
  // =============================================================================
  // DELETE
  // =============================================================================
  deleteRow(table: string, wineId: any): Observable<any> {
    const url = `${this.apiUrl}tables/${table}/deleteRow/${wineId}`;
    console.log('mySqlService:deleteRow()', url);
    return this.http.delete<any>(url);
  }
}
