import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseMin } from '../store/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }

  getCartItems() {
    return this.http.get<CourseMin[]>('http://localhost:3000/items');
  }
  addItemToCart(Course: CourseMin) {
    return this.http.post<CourseMin>('http://localhost:3000/items', Course);
  }
  deleteItemFromCart(CourseId: string) {
    return this.http.delete('http://localhost:3000/items/' + CourseId);
  }
}
