import {Component, inject} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'
import { NouisliderModule } from 'ng2-nouislider'
import {Category, Product} from "../../../../../core/models/product.model";
import {ApiService} from "../../../../../core/services/api.service";
import {CommonModule} from "@angular/common";
import {SelectFormInputApiDirective} from "../../../../../core/directive/select-form-input-api.directive";

@Component({
  selector: 'property-filter',
  standalone: true,
  imports: [SelectFormInputDirective, NouisliderModule, FormsModule,
    ReactiveFormsModule,SelectFormInputApiDirective,
    FormsModule,
    CommonModule],
  templateUrl: './product-filter.component.html',
  styles: ``,
})
export class ProductFilterComponent {
  someRange = [6000, 100000]
  categories: Category[] = [];
  apiService = inject(ApiService)
  rangeConfig = {
    start: [6000, 100000],
    step: 1,
    margin: 0,
    connect: true,
    behaviour: 'tap-drag',
    range: {
      min: 0,
      max: 120000,
    },
  }
  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
      this.categories = this.categories.map(city => ({
        ...city,
        name: city.intitule
      }));

    });
  }

  findProducts() {

  }
}
