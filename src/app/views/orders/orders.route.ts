import type { Route } from '@angular/router'
import {OrdersComponent} from "./orders.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {DeliveryComponent} from "./delivery/delivery.component";
import {OrderReturnComponent} from "./order-return/order-return.component";
import {LitigeRequestComponent} from "./litige-request/litige-request.component";

export const ORDERS_ROUTES: Route[] = [
  { path: 'list', component: OrdersComponent, data: { title: 'Commandes List' }
  },
  { path: ':id', component: OrderDetailComponent, data: { title: 'Commandes Detail' }
  },
  { path: 'delivery/:id', component: DeliveryComponent, data: { title: 'Commandes Livraison' }
  },
  { path: 'return/:id', component: OrderReturnComponent, data: { title: 'Commandes Livraison' }
  },
  { path: ':id/issue', component: LitigeRequestComponent }

]
