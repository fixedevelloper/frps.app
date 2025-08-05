import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartItem} from "../models/cart-item.model";
import {Product} from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class CartService {
  // Le panier est un BehaviorSubject pour notifier les abonnés des changements
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Optionnel : charger panier depuis localStorage si besoin
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItemsSubject.next(JSON.parse(saved));
    }
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }
  addItem(item: Product) {
    const cartItem: CartItem = {
      productId: item.id,
      name: item.intitule,
      price: +item.price,
      quantity: 1,
      image: item.image
    };

    // Copie du tableau actuel pour éviter mutation directe
    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex(i => i.productId === cartItem.productId);

    if (index > -1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + cartItem.quantity
      };
    } else {
      items.push(cartItem);
    }

    this.cartItemsSubject.next(items);
    this.saveToStorage(items);
  }


  removeItem(id: number) {
    // Récupérer la liste actuelle des articles
    const currentItems = this.cartItemsSubject.value;

    // Filtrer pour enlever l'article avec l'id donné
    const filteredItems = currentItems.filter(item => item.productId !== id);

    // Mettre à jour le BehaviorSubject avec la nouvelle liste
    this.cartItemsSubject.next(filteredItems);

    // Sauvegarder la nouvelle liste dans le localStorage ou autre
    this.saveToStorage(filteredItems);
  }


  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  updateQuantity(id: number, quantity: number) {
    const items = this.cartItemsSubject.value;
    const index = items.findIndex(i => i.productId === id);
    if (index > -1) {
      items[index].quantity = quantity;
      this.cartItemsSubject.next(items);
      this.saveToStorage(items);
    }
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
