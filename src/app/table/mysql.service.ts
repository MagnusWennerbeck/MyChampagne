import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MySqlService {
  private apiUrl = 'http://localhost:3000/api/'; // Uppdatera URL:en enligt din server

  // Konstruktor ...................................................................
  // constructor() { }
  constructor(private http: HttpClient) {
    // this.getDataByMenuSelection('Wines');
  }

  // getData(): Observable<any[]> {
  //   console.log('MySqlService:getData() Observable');
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // getDataByMenuSelection(menuSelection: string): Observable<any[]> {
  //   const url = this.apiUrl + menuSelection;
  //   return this.http.get<any[]>(url);
  // }

  // Methods ......................................................................

  getDataByMenuSelection(menuSelection: string): Observable<any[]> {
    const url = this.apiUrl + menuSelection;
    console.log('mySqlService:getDataByMenuSelection() ', url);
    return this.http.get<any[]>(url);
  }

  // private getWinesData(): Observable<any[]> {
  //   const url = this.apiUrl + 'wines';
  //   console.log("MySqlService:getWinesData()", url);
  //   return this.http.get<any[]>(url);
  // }

  // private getProducersData(): Observable<any[]> {
  //   const url = this.apiUrl + 'producers';
  //   console.log("MySqlService:getProducersData()");
  //   return this.http.get<any[]>(url);
  // }

  // private getNotesData(): Observable<any[]> {
  //   const url = this.apiUrl + 'notes';
  //   console.log("MySqlService:getNotesData()");
  //   return this.http.get<any[]>(url);
  // }
}
