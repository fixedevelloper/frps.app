import { Component } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {PageTitleComponent} from "../../../components/page-title.component";
import {CommonModule} from "@angular/common";
import {XafCurrencyPipe} from "../../../pipes/xaf-currency.pipe";
import {SelectFormInputDirective} from "../../../core/directive/select-form-input.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-order-return',
  standalone: true,
  imports: [ PageTitleComponent,CommonModule, XafCurrencyPipe,    SelectFormInputDirective,
    ReactiveFormsModule,
    FormsModule,
    CommonModule],
  templateUrl: './order-return.component.html',
  styleUrl: './order-return.component.scss'
})
export class OrderReturnComponent {
  order: any;
  orderId!: number;
  selectedItem: any = null;
  returnData = {
    reason: ''
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: ApiService
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe((data) => {
        this.order = data.data;
      });
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.returnData = { reason: '' };
  }

  cancelReturn() {
    this.selectedItem = null;
    this.returnData = { reason: '' };
  }

  submitReturn() {
    const payload = {
      order_item_id: this.selectedItem.id,
      reason: this.returnData.reason,
      order_id:this.orderId.toString()
    };

    this.orderService.submitReturnRequest(payload).subscribe((res) => {
      alert('Demande de retour envoyée avec succès');
      this.cancelReturn();
    });
  }
}
