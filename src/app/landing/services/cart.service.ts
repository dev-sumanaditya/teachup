import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CourseMin } from "../store/models/cart.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems() {
    return this.http.get<any>(environment.apiUrl + "/cart");
  }
  addItemToCart(Course: Partial<CourseMin>) {
    return this.http.post<any>(environment.apiUrl + "/cart/add", Course);
  }
  deleteItemFromCart(CourseId: string) {
    return this.http.post<any>(environment.apiUrl + "/cart/delete", {
      id: CourseId,
    });
  }
}
