import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { CommonModule, DecimalPipe } from '@angular/common'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import {Product} from "../../../../../core/models/product.model";
import {ApiService} from "../../../../../core/services/api.service";
import { currency } from '@common/constants'
import {CartService} from "../../../../../core/services/cart.service";

@Component({
  selector: 'property-data',
  standalone: true,
  imports: [DecimalPipe, CommonModule, NgbPaginationModule],
  templateUrl: './product-data.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDataComponent {
  currency = currency
  products: Product[] = [];
  filteredItems: Product[] = [];
  paginatedItems: Product[] = [];
  filteredProducts: Product[] = []; // Produits filtrés
  selectedCategory: string | null = '';
  categories: string[] = [];

  searchText = '';
  currentPage = 1;
  pageSize = 20;
  totalItems = 0;
  constructor(private productService: ApiService,public cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(response => {
      this.products = response.data;
      this.totalItems = response.total;
      this.currentPage = response.current_page;
      this.extractCategories()
      this.filteredProducts = [...this.products];
    });
  }
  extractCategories() {
    // distinct
    this.categories = this.products
      .map(p => p.categorie)
      .filter((c, index, arr) => c && arr.indexOf(c) === index);
  }
  filterProducts() {
    this.filteredProducts = this.products.filter((p) =>
      p.intitule.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.categorie?.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
    // this.paginate();
  }
  filterByCategory(category: string | null) {
    this.selectedCategory = category;

    if (!category) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.categorie === category);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }
}
