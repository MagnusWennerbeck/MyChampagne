// table-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  getData() {
    // Hämta och returnera din data här
    return [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
      { id: 3, name: 'Item 3', description: 'Description 3' },
      { id: 4, name: 'Item 4', description: 'Description 4' },
      { id: 5, name: 'Item 5', description: 'Description 5' },
      { id: 6, name: 'Item 6', description: 'Description 6' },
      { id: 7, name: 'Item 7', description: 'Description 7' },

    ];
  }
}
