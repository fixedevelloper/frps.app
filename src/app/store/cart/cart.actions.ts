// store/cart/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import {CartItem} from "../../core/models/cart-item.model";

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const clearCart = createAction('[Cart] Clear');

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);
