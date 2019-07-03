import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DataItem } from '../../model';

const MOCK_ITEMS: DataItem[] = [
  { id: 1, name: 'item1', description: 'first item', referenceCode: '0x23568949', createdDate: null},
  { id: 2, name: 'second item', description: 'this item comes after the first item', referenceCode: '', createdDate: null},
  { id: 3, name: 'another item', description: 'we have lots of items', referenceCode: '', createdDate: null},
  { id: 23, name: 'bonus item', description: 'this item is extra', referenceCode: '', createdDate: null},
  { id: 51, name: 'Bobi', description: '7 ft 3 Center for the Philadelphia 76ers', referenceCode: '', createdDate: null},
];

@Injectable()
export class DataService {

  private items: Map<number, DataItem> = new Map<number, DataItem>();

  constructor() {
    MOCK_ITEMS.forEach(item => {
      this.items.set(item.id, item);
    })
  }

  listItems(): Observable<DataItem[]> {
    let values = Array.from(this.items.values());
    return of(values).pipe(delay(200));
  }

  getItem(id: number): Observable<DataItem> {
    return of(this.items.get(id)).pipe(delay(200));
  }

  createItem(item: DataItem): Observable<DataItem> {
    item.id = this.generateId();
    this.items.set(item.id, item);
    return of(item).pipe(delay(200));
  }

  deleteItem(item: DataItem): Observable<void> {
    this.items.delete(item.id);
    return of(null);
  }

  private generateId(): number {
    let id: number = 0;
    if(this.items.size >= 100) {
      throw new Error('cannot add any more items');
    }
    do {
      id = Math.floor(Math.random()*100)+1;
    } while(this.items.has(id));
    return id;
  }
}
