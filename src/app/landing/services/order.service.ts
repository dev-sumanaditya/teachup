import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { CourseMin } from '../store/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderState = new BehaviorSubject<CourseMin[]>([]);

  constructor() { }

  setState(list: CourseMin[]) {
    this.orderState.next(list);
  }

  getState(): Observable<CourseMin[]> {
    return this.orderState.asObservable();
  }

  deleteItemFromList(id) {
    let data: CourseMin[] = null;
    this.orderState.subscribe(
      list => {
        data = list;
      }
    );
    const filteredList: CourseMin[] = data.filter(item => item.id !== id);
    this.setState(filteredList);
  }
}
