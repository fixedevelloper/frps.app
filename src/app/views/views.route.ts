import type { Route } from '@angular/router'

export const VIEWS_ROUTES: Route[] = [
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./dashboards/dashboard.route').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.route').then((mod) => mod.ORDERS_ROUTES),
  },
  {
    path: 'litiges',
    loadChildren: () =>
      import('./litiges/litiges.route').then((mod) => mod.LITIGES_ROUTES),
  },
  {
    path: 'retours',
    loadChildren: () =>
      import('./retours/retours.route').then((mod) => mod.RETOURS_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.route').then((mod) => mod.PRODUCTS_ROUTES),
  },
]
