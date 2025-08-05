import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {PageTitleComponent} from "../../../components/page-title.component";
import {NgbDropdownModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Product} from "../../../core/models/product.model";
import {ApiService} from "../../../core/services/api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PageTitleComponent, NgbDropdownModule,NgbPaginationModule, CommonModule ,RouterLink,ReactiveFormsModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = [];
  filteredItems: Product[] = [];
  paginatedItems: Product[] = [];
  filteredProducts: Product[] = []; // Produits filtrés
  selectedCategory: string | null = '';
  categories: string[] = [];

  searchText = '';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  constructor(private productService: ApiService) {}

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
