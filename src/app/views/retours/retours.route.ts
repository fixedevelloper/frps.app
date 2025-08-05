import type { Route } from '@angular/router'
import {RetoursComponent} from "./retours.component";



export const RETOURS_ROUTES: Route[] = [
  { path: 'list', component: RetoursComponent, data: { title: 'Retours List' } },

]
