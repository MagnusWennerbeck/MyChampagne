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

  // Methods ......................................................................

  getDataByMenuSelection(menuSelection: string): Observable<any[]> {
    const url = this.apiUrl + menuSelection;
    console.log('mySqlService:getDataByMenuSelection() ', url);
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

  updateDatabase(id: string, columnHeader: string, value: string): Observable<any> {
    const updateUrl = `http://localhost:3000/api/Wines/updateCell/${id}`;

    // Skicka förfrågan och använd map-operatorn för att hantera svaret
    return this.http.put(updateUrl, { columnName: columnHeader, newValue: value }).pipe(
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
}
