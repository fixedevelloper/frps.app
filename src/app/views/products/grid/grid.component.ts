import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { ProductFilterComponent } from './components/product-filter/product-filter.component'
import {ProductDataComponent} from "./components/product-data/product-data.component";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [PageTitleComponent, ProductFilterComponent, ProductDataComponent],
  templateUrl: './grid.component.html',
  styles: ``,
})
export class GridComponent {}
