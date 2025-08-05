import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {CommonModule} from "@angular/common";
import {XafCurrencyPipe} from "../../../pipes/xaf-currency.pipe";
import {PageTitleComponent} from "../../../components/page-title.component";
import {currency} from '@common/constants'
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserModels} from "../../../core/models/user.models";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {SafeUrlPipe} from "../../../pipes/safeUrl.pipe";
@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [ PageTitleComponent, XafCurrencyPipe,SafeUrlPipe, ReactiveFormsModule,
    FormsModule,
    CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderDetailComponent {
  orderId!: number;
  order: any;
  currency = currency
  paymentForm: UntypedFormGroup
  public fb = inject(UntypedFormBuilder)
  toastService=inject(ToastrService)
  constructor(
    private route: ActivatedRoute,
    private orderService: ApiService
  ) {
    this.paymentForm = this.fb.group({
      order_id: [this.orderId, []],
      amount: ['', [Validators.required]],
      methodPayment: ['', [Validators.required]],

    })
  }
  get form() {
    return this.paymentForm.controls
  }
  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchOrder();
  }

  fetchOrder() {
    this.orderService.getOrderById(this.orderId).subscribe((data) => {
      this.order = data.data;
    });
  }
  getTotalPrice(item: any) {
    return item.quantity * item.product_price;
  }

  onPayd() {
    if (this.paymentForm.valid) {

      const formValue = this.paymentForm.value;
      formValue.order_id=this.orderId
      this.orderService.makePayment(formValue).subscribe({
        next: (cat:UserModels) => {
          this.toastService.success('Paiemnet effectue avec success');
          this.fetchOrder()
          //this.route.navigateByUrl('auth/sign-in');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.toastService.error('Erreur lors de l\'ajout '+err.error.message);
        }
      });
    }
  }
}
