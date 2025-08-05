import { Component } from '@angular/core';
import {CartItem} from "../../../core/models/cart-item.model";
import {CartService} from "../../../core/services/cart.service";
import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {PageTitleComponent} from "../../../components/page-title.component";
import {RouterLink} from "@angular/router";
import { currency } from '@common/constants'
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,PageTitleComponent,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  currency = currency
  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  updateQuantity(id: number, qty: number) {
    if(qty > 0) {
      this.cartService.updateQuantity(id, qty);
    }
  }
  increaseQty(item: CartItem): void {
    item.quantity++;
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  decreaseQty(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.productId, item.quantity);
    }
  }
  onInputChange(event: Event, productId: number) {
    const input = event.target as HTMLInputElement;
    const quantity = input.valueAsNumber;
    this.updateQuantity(productId, quantity);
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
