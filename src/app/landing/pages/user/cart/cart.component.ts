import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CartState } from 'src/app/landing/store/states/cart.state';
import { Observable } from 'rxjs';
import { CourseMin } from 'src/app/landing/store/models/cart.model';
import { GetCartItems, DeleteCartItem } from 'src/app/landing/store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Select(CartState.getCartItems) cartItems: Observable<CourseMin[]>;

  public data = [1];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCartItems());
  }

  deleteItem(id): void {
    this.store.dispatch(new DeleteCartItem(id));
  }

}
