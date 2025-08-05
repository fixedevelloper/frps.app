import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { orderData } from './dat'
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import {LitigesModel, OrderModel} from "../../core/models/litiges.model";
import {ApiService} from "../../core/services/api.service";
import {ToastrService} from "ngx-toastr";
import {XafCurrencyPipe} from "../../pipes/xaf-currency.pipe";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgbDropdownModule,
    NgbPaginationModule,
    CommonModule,XafCurrencyPipe,RouterLink
  ],
  templateUrl: './orders.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersComponent {
  orders: OrderModel[] = [];
  filteredOrderModels: OrderModel[] = [];
  searchText = '';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  constructor(private apiService: ApiService,private toastService:ToastrService,private router: Router) {}
  ngOnInit(): void {
    this.loadItems();
  }
  getStatusClass(status: string): string {
    return {
      Success: 'bg-success',
      Processing: 'bg-primary',
      Rejected: 'bg-danger',
      Pending: 'bg-warning'
    }[status] || 'bg-secondary';
  }

  loadItems() {
    this.apiService.getOrders(this.currentPage, this.pageSize).subscribe(response => {
      this.orders = response.data;
      this.totalItems = response.total;
      this.currentPage = response.current_page;
      this.filteredOrderModels = [...this.orders];
    });
  }
  filterItems() {
    this.filteredOrderModels = this.orders.filter((p) =>
      p.customer_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.status?.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadItems();
  }
  onView(item: OrderModel) {
    this.toastService.success(`Voir commade : ${item.id}`);
    this.router.navigate(['/orders', item.id]);

  }

  onEdit(item: LitigesModel) {
    // Par exemple : naviguer vers un formulaire d'édition
    console.log('Modifier catégorie', item);
     this.router.navigate(['/categories/edit', item.id]);
  }

  onDelete(item: LitigesModel) {
    if (confirm(`Confirmer la suppression de la catégorie "${item.commande_id}" ?`)) {
      this.apiService.deleteAgent(item.id).subscribe({
        next: () => {
          this.toastService.success('Catégorie supprimée');
          this.loadItems();
        },
        error: err => {
          console.error(err);
          this.toastService.error('Erreur lors de la suppression');
        }
      });
    }
  }
}
