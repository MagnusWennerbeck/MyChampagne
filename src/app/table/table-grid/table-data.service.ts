// table-data.service.ts

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
      { id: 1, name: 'Item 1', description: 'Description Wine 1' },
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
        { id: 1, name: 'Wine 1', description: 'Description 1' },
        { id: 2, name: 'Wine 2', description: 'Description 2' },
        { id: 3, name: 'Wine 3', description: 'Description 3' },
        { id: 4, name: 'Wine 4', description: 'Description 4' },
        { id: 5, name: 'Wine 5', description: 'Description 5' },
        { id: 6, name: 'Wine 6', description: 'Description 6' },
        { id: 7, name: 'Wine 7', description: 'Description 7' },
  
      ];
  }

  private getProducersData(): any[] {
    console.log("getProducersData()");
    // Implementera logik för att hämta producentdata
    // Exempel: return this.httpClient.get('api/producers');
    return [
        { id: 1, name: 'Producer 1', description: 'Description 1' },
        { id: 2, name: 'Producer 2', description: 'Description 2' },
        { id: 3, name: 'Producer 3', description: 'Description 3' },
        { id: 4, name: 'Producer 4', description: 'Description 4' },
        { id: 5, name: 'Producer 5', description: 'Description 5' },
        { id: 6, name: 'Producer 6', description: 'Description 6' },
        { id: 7, name: 'Producer 7', description: 'Description 7' },
  
      ];
  }

  private getNotesData(): any[] {
    console.log("getNotesData()");
    // Implementera logik för att hämta noter
    // Exempel: return this.httpClient.get('api/notes');
    return [
        { id: 1, name: 'Note 1', description: 'Description Note 1' },
        { id: 2, name: 'Note 2', description: 'Description Note 2' },
        { id: 3, name: 'Note 3', description: 'Description Note 3' },
        { id: 4, name: 'Note 4', description: 'Description Note 4' },
        { id: 5, name: 'Note 5', description: 'Description Note 5' },

  
      ];
  }
  
}
