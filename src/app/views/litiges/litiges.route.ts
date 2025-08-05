import type { Route } from '@angular/router'
import {LitigesComponent} from "./litiges.component";


export const LITIGES_ROUTES: Route[] = [
  { path: 'list', component: LitigesComponent, data: { title: 'Litige List' } },

]
