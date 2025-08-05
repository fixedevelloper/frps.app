import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {currency} from '@common/constants'
import {PageTitleComponent} from "../../../components/page-title.component";
import {CommonModule} from "@angular/common";
import {XafCurrencyPipe} from "../../../pipes/xaf-currency.pipe";
@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [ PageTitleComponent,CommonModule, XafCurrencyPipe,RouterLink],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
  order: any;
  loading = true;
  currency = currency
  constructor(
    private route: ActivatedRoute,
    private orderService: ApiService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderDetail(orderId).subscribe((res) => {
        this.order = res.data;
        this.loading = false;
      });
    }
  }
  getTrackingProgress(status: string): string {
    switch (status) {
      case 'préparée':
        return '25%';
      case 'en cours de livraison':
        return '50%';
      case 'livrée':
        return '100%';
      default:
        return '10%';
    }
  }

}
