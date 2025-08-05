import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {UserModels} from "../../core/models/user.models";
import {ApiService} from "../../core/services/api.service";
import {ToastrService} from "ngx-toastr";
import {LitigesModel} from "../../core/models/litiges.model";
import {NgbDropdownModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {PageTitleComponent} from "../../components/page-title.component";

@Component({
  selector: 'app-litiges',
  standalone: true,
  imports: [PageTitleComponent, NgbPaginationModule, NgbDropdownModule,CommonModule],
  templateUrl: './litiges.component.html',
  styleUrl: './litiges.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LitigesComponent {
  users: LitigesModel[] = [];
  filteredItems: LitigesModel[] = [];
  paginatedItems: LitigesModel[] = [];
  filteredLitigesModels: LitigesModel[] = []; // Produits filtrés


  searchText = '';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  constructor(private apiService: ApiService,private toastService:ToastrService) {}

  ngOnInit(): void {
    this.loadItems();
  }
  loadItems() {
    this.apiService.getLitiges(this.currentPage, this.pageSize).subscribe(response => {
      this.users = response.data;
      this.totalItems = response.total;
      this.currentPage = response.current_page;
      this.filteredLitigesModels = [...this.users];
    });
  }
  filterItems() {
    this.filteredLitigesModels = this.users.filter((p) =>
      p.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.status?.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadItems();
  }
  onView(item: LitigesModel) {
    // Par exemple : afficher une modale ou rediriger vers la page détail
    console.log('Voir catégorie', item);
    this.toastService.success(`Voir catégorie : ${item.commande_id}`);
  }

  onEdit(item: LitigesModel) {
    // Par exemple : naviguer vers un formulaire d'édition
    console.log('Modifier catégorie', item);
    // this.router.navigate(['/categories/edit', item.id]);
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
