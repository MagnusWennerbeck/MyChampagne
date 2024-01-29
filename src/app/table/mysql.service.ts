import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MySqlService {
  private apiUrl = 'http://localhost:3000/api/'; // Uppdatera URL:en enligt din server

  private rowCountSubject = new BehaviorSubject<number>(0);
  rowCount$ = this.rowCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Methods ......................................................................

  getDataByMenuSelection(menuSelection: string): Observable<any[]> {
    const url = this.apiUrl + menuSelection;
    console.log('mySqlService:getDataByMenuSelection() ', url);
    return this.http.get<any[]>(url);
  }

  updateDatabase(
    id: string,
    columnHeader: string,
    value: string
  ): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/Wines/updateCell/${wineId}`;

    return this.http.put(updateUrl, { columnName, newValue });
  }
}
