import { CourseMin } from '../models/cart.model';


// Actions
export class AddCartItem {
  static readonly type = '[Cart] Add';
  constructor(public payload: CourseMin) {}
}

export class DeleteCartItem {
  static readonly type = '[Cart] Delete';
  constructor(public id: string) {}
}

export class GetCartItems {
  static readonly type = '[Cart] Get items';
}

export class ClearCart {
  static readonly type = '[Cart] Clear all';
}
