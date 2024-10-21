import { Component, input } from '@angular/core';
import { OrderDetail } from '../../../../../product/order-detail.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-user-order-detail-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-order-detail-card.component.html',
  styleUrl: './user-order-detail-card.component.scss'
})
export class UserOrderDetailCardComponent {

  orderDetail = input<OrderDetail>();

  public getImage(): string {
    return this.orderDetail()?.productDetail.imageData?.imageUrls || this.orderDetail()?.productDetail.product.imageData?.imageUrls || '';
  }

  public isPet(): boolean {
    return !!this.orderDetail()!.productDetail.product && this.orderDetail()!.productDetail.product?.category !== null;
  }

}
