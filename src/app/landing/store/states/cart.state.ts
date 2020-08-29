import { State, Action, StateContext, Selector } from "@ngxs/store";
import * as CartActions from "../actions/cart.action";
import { CartService } from "../../services/cart.service";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

export class CartStateModel {
  courses: any[];
}

@State<CartStateModel>({
  name: "cart",
  defaults: {
    courses: [],
  },
})
@Injectable()
export class CartState {
  constructor(private cartService: CartService) {}

  @Selector()
  static getCartItems(state: CartStateModel) {
    return state.courses;
  }

  // Cart reducers
  @Action(CartActions.GetCartItems)
  getCartItems({ getState, setState }: StateContext<CartStateModel>) {
    return this.cartService.getCartItems().pipe(
      tap(({ data }) => {
        const state = getState();
        setState({
          ...state,
          courses: data.courses,
        });
      })
    );
  }

  @Action(CartActions.AddCartItem)
  addCartItem(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: CartActions.AddCartItem
  ) {
    return this.cartService.addItemToCart(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          courses: [
            ...state.courses.filter((course) => course.id !== payload.id),
            payload,
          ],
        });
      })
    );
  }

  @Action(CartActions.DeleteCartItem)
  deleteCartItem(
    { getState, setState }: StateContext<CartStateModel>,
    { id }: CartActions.DeleteCartItem
  ) {
    return this.cartService.deleteItemFromCart(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.courses.filter((item) => item.id !== id);
        setState({
          ...state,
          courses: filteredArray,
        });
      })
    );
  }
}
