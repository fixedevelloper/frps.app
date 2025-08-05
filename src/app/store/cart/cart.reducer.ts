// store/cart/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addToCart, (state, { item }) => {
    const exists = state.items.find(i => i.productId === item.productId);
    const updatedItems = exists
      ? state.items.map(i =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      )
      : [...state.items, item];

    const total = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return { ...state, items: updatedItems, totalAmount: total };
  }),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    const updatedItems = state.items.map(i =>
      i.productId === productId ? { ...i, quantity } : i
    );
    const total = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return { ...state, items: updatedItems, totalAmount: total };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter(i => i.productId !== productId);
    const total = updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return { ...state, items: updatedItems, totalAmount: total };
  }),

  on(CartActions.clearCart, state => ({
    ...state,
    items: [],
    totalAmount: 0
  }))
);
