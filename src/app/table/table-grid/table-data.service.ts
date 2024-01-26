// table-data.service.ts
import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  
  menuItemSelected: any;

  getData() {
    // Hämta och returnera din data här
    console.log("getData()");
    return [
      { id: 1, wine: 'Item 1', description: 'Description Wine 1' },
      { id: 2, name: 'Item 2', description: 'Description Wine 2' },
      { id: 3, name: 'Item 3', description: 'Description Wine 3' },
      { id: 4, name: 'Item 4', description: 'Description Wine 4' },
      { id: 5, name: 'Item 5', description: 'Description Wine 5' },
      { id: 6, name: 'Item 6', description: 'Description Wine 6' },
      { id: 7, name: 'Item 7', description: 'Description Wine 7' },     
      { id: 8, name: 'Item 8', description: 'Description Wine 8' },
      { id: 9, name: 'Item 9', description: 'Description Wine 9' },
      { id: 10, name: 'Item 10', description: 'Description Wine 10' },

    ];
  }
    
  getDataByMenuSelection(menuSelection: string): any[] {
    console.log("getDataByMenuSelection: " + menuSelection);
    // Implementera logik för att hämta data baserat på menyvalet
    switch (menuSelection) {
      case 'Wines':
        return this.getWinesData();
      case 'Producers':
        return this.getProducersData();
      case 'Notes':
        return this.getNotesData();
      default:
        return [];
    }
  }

  private getWinesData(): any[] {
    console.log("getWinesData()");
    // Implementera logik för att hämta vindedata
    // Exempel: return this.httpClient.get('api/wines');
    return [
        { id: 1, wine: 'Wine 1', description: 'Description 1' },
        { id: 2, wine: 'Wine 2', description: 'Description 2' },
        { id: 3, wine: 'Wine 3', description: 'Description 3' },
        { id: 4, wine: 'Wine 4', description: 'Description 4' },
        { id: 5, wine: 'Wine 5', description: 'Description 5' },
        { id: 6, wine: 'Wine 6', description: 'Description 6' },
        { id: 7, wine: 'Wine 7', description: 'Description 7' },
        { id: 8, wine: 'Wine 8', description: 'Description 8' },
        { id: 9, wine: 'Wine 9', description: 'Description 9' },

        { id: 10, wine: 'Wine 10', description: 'Description 10' },
        { id: 11, wine: 'Wine 11', description: 'Description 11' },
        { id: 12, wine: 'Wine 12', description: 'Description 12' },
        { id: 13, wine: 'Wine 13', description: 'Description 13' },
        { id: 14, wine: 'Wine 14', description: 'Description 14' },
        { id: 15, wine: 'Wine 15', description: 'Description 15' },
        { id: 16, wine: 'Wine 16', description: 'Description 16' },
        { id: 17, wine: 'Wine 17', description: 'Description 17' },
        { id: 18, wine: 'Wine 18', description: 'Description 18' },
        { id: 19, wine: 'Wine 19', description: 'Description 19' },

        { id: 20, wine: 'Wine 20', description: 'Description 20' },
        { id: 21, wine: 'Wine 21', description: 'Description 21' },
        { id: 22, wine: 'Wine 22', description: 'Description 22' },
        { id: 23, wine: 'Wine 23', description: 'Description 23' },
        { id: 24, wine: 'Wine 24', description: 'Description 24' },
        { id: 25, wine: 'Wine 25', description: 'Description 25' },
        { id: 26, wine: 'Wine 26', description: 'Description 26' },
        { id: 27, wine: 'Wine 27', description: 'Description 27' },
        { id: 28, wine: 'Wine 28', description: 'Description 28' },
        { id: 29, wine: 'Wine 29', description: 'Description 29' },

        { id: 30, wine: 'Wine 10', description: 'Description 10' },
        { id: 31, wine: 'Wine 11', description: 'Description 11' },
        { id: 32, wine: 'Wine 12', description: 'Description 12' },
        { id: 33, wine: 'Wine 13', description: 'Description 13' },
        { id: 34, wine: 'Wine 14', description: 'Description 14' },
        { id: 35, wine: 'Wine 15', description: 'Description 15' },
        { id: 36, wine: 'Wine 16', description: 'Description 16' },
        { id: 37, wine: 'Wine 17', description: 'Description 17' },
        { id: 38, wine: 'Wine 18', description: 'Description 18' },
        { id: 39, wine: 'Wine 19', description: 'Description 19' },

        { id: 40, wine: 'Wine 10', description: 'Description 20' },        
        { id: 41, wine: 'Wine 11', description: 'Description 11' },
        { id: 42, wine: 'Wine 12', description: 'Description 12' },
        { id: 43, wine: 'Wine 13', description: 'Description 13' },
        { id: 44, wine: 'Wine 14', description: 'Description 14' },
        { id: 45, wine: 'Wine 15', description: 'Description 15' },
        { id: 46, wine: 'Wine 16', description: 'Description 16' },
        { id: 47, wine: 'Wine 17', description: 'Description 17' },
        { id: 48, wine: 'Wine 18', description: 'Description 18' },
        { id: 49, wine: 'Wine 19', description: 'Description 19' },
        { id: 50, wine: 'Wine 10', description: 'Description 20' },
      ];
  }

  private getProducersData(): any[] {
    console.log("TableDataService:getProducersData()");
    // Implementera logik för att hämta producentdata
    // Exempel: return this.httpClient.get('api/producers');
    return [
      { id: 40, wine: 'Wine 10', description: 'Description 20' },        
      { id: 41, wine: 'Wine 11', description: 'Description 11' },
      { id: 42, wine: 'Wine 12', description: 'Description 12' },
      { id: 43, wine: 'Wine 13', description: 'Description 13' },
      { id: 44, wine: 'Wine 14', description: 'Description 14' },
      { id: 45, wine: 'Wine 15', description: 'Description 15' },
      { id: 46, wine: 'Wine 16', description: 'Description 16' },
      { id: 47, wine: 'Wine 17', description: 'Description 17' },
      { id: 48, wine: 'Wine 18', description: 'Description 18' },
      { id: 49, wine: 'Wine 19', description: 'Description 19' },
      { id: 50, wine: 'Wine 10', description: 'Description 20' },
      //   { id: 1, producer: 'Producer 1', description: 'Description 1' },
      //   { id: 2, producer: 'Producer 2', description: 'Description 2' },
      //   { id: 3, producer: 'Producer 3', description: 'Description 3' },
      //   { id: 4, producer: 'Producer 4', description: 'Description 4' },
      //   { id: 5, producer: 'Producer 5', description: 'Description 5' },
      //   { id: 6, producer: 'Producer 6', description: 'Description 6' },
      //   { id: 7, producer: 'Producer 7', description: 'Description 7' },
  
      ];
  }

  private getNotesData(): any[] {
    console.log("getNotesData()");
    // Implementera logik för att hämta noter
    // Exempel: return this.httpClient.get('api/notes');
    return [
        { id: 1, date: 'Note 1', notes: 'Description Note 1' },
        { id: 2, date: 'Note 2', notes: 'Description Note 2' },
        { id: 3, date: 'Note 3', notes: 'Description Note 3' },
        { id: 4, date: 'Note 4', notes: 'Description Note 4' },
        { id: 5, date: 'Note 5', notes: 'Description Note 5' },

  
      ];
  }
  
}
