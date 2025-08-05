import type { Route } from '@angular/router'
import {ListComponent} from "./list/list.component";
import {GridComponent} from "./grid/grid.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";

export const PRODUCTS_ROUTES: Route[] = [
  { path: '', component: GridComponent, data: { title: 'Product' } },
  { path: 'list', component: ListComponent, data: { title: 'Product List' } },
  { path: 'cart', component: CartComponent, data: { title: 'Cart List' } },
  { path: 'checkout', component: CheckoutComponent, data: { title: 'checkout List' } },

  //{ path: 'detail', component: AddComponent, data: { title: 'Add product' } },
]
