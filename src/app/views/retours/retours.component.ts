import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {UserModels} from "../../core/models/user.models";
import {ApiService} from "../../core/services/api.service";
import {ToastrService} from "ngx-toastr";
import {ReturnRequest} from "../../core/models/litiges.model";
import {NgbDropdownModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {PageTitleComponent} from "../../components/page-title.component";

@Component({
  selector: 'app-retours',
  standalone: true,
  imports: [PageTitleComponent, NgbPaginationModule, NgbDropdownModule,CommonModule],
  templateUrl: './retours.component.html',
  styleUrl: './retours.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RetoursComponent {
  returnRequests: ReturnRequest[] = [];
  filteredItems: ReturnRequest[] = [];
  paginatedItems: ReturnRequest[] = [];
  filteredReturnRequest: ReturnRequest[] = []; // Produits filtrés


  searchText = '';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  constructor(private apiService: ApiService,private toastService:ToastrService) {}

  ngOnInit(): void {
    this.loadItems();
  }
  loadItems() {
    this.apiService.getRetourProducts(this.currentPage, this.pageSize).subscribe(response => {
      this.returnRequests = response.data;
      this.totalItems = response.total;
      this.currentPage = response.current_page;
      this.filteredReturnRequest = [...this.returnRequests];
    });
  }
  filterItems() {
    this.returnRequests = this.returnRequests.filter((p) =>
      p.product_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.product_id?.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadItems();
  }
  onView(item: ReturnRequest) {
    // Par exemple : afficher une modale ou rediriger vers la page détail
    console.log('Voir catégorie', item);
    this.toastService.success(`Voir catégorie : ${item.product_name}`);
  }

  onEdit(item: ReturnRequest) {
    // Par exemple : naviguer vers un formulaire d'édition
    console.log('Modifier catégorie', item);
    // this.router.navigate(['/categories/edit', item.id]);
  }

  onDelete(item: ReturnRequest) {
    if (confirm(`Confirmer la suppression de la catégorie "${item.product_name}" ?`)) {
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
