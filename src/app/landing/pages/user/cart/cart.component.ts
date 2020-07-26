import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CartState } from 'src/app/landing/store/states/cart.state';
import { Observable } from 'rxjs';
import { CourseMin } from 'src/app/landing/store/models/cart.model';
import { DeleteCartItem } from 'src/app/landing/store/actions/cart.action';
import { OrderService } from 'src/app/landing/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Select(CartState.getCartItems) cartItems: Observable<CourseMin[]>;

  public cartData: CourseMin[];
  public loading = true;

  constructor(
    private store: Store,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems.subscribe(
      data => {
        this.loading = false;
        this.cartData = data;
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  deleteItem(id): void {
    this.store.dispatch(new DeleteCartItem(id));
  }

  proceedToPaymentPage() {
    this.orderService.setState(this.cartData);
    this.router.navigate(['/payment']);
  }

}
