import {Component} from '@angular/core';
import {CartItem} from "../../../core/models/cart-item.model";
import {CartService} from "../../../core/services/cart.service";

import {currency} from '@common/constants'
import {CommonModule} from "@angular/common";
import {PageTitleComponent} from "../../../components/page-title.component";
import {Router, RouterLink} from "@angular/router";
import {SelectFormInputDirective} from "../../../core/directive/select-form-input.directive";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../core/services/api.service";
import {Category} from "../../../core/models/product.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {OrderModel} from "../../../core/models/litiges.model";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, PageTitleComponent, RouterLink, SelectFormInputDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  currency = currency
  items: CartItem[] = [];
  total = 0;
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router,
              private cartService: CartService,
              private apiService: ApiService,private toastService:ToastrService) {
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.checkoutForm = this.fb.group({
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value;
      console.log('Données de commande :', formData, this.items);
      const order = {
        products: this.items,
        total: this.total,
      }
      //  alert('✅ Commande confirmée avec paiement via : ' + formData.paymentMethod.toUpperCase());
      this.apiService.saveOrder(order).subscribe({
        next: (cat:OrderModel) => {
          console.log('commande créée:', cat);
          this.toastService.success('commande ajoutée');
          this.cartService.clearCart();
          this.checkoutForm.reset();
          this.router.navigateByUrl('orders/list');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.toastService.error('Erreur lors de l\'ajout');
        }
      });

    }
  }
}
