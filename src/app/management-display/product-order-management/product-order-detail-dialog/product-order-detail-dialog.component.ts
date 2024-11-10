import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  inject
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order, OrderStatus } from '../../../product/order.model';
import { EnumValuePipe } from '../../../sharing/enum-value.pipe';
import { PaymentSupplierMeaning } from '../../../product/payment.model';

@Component({
  selector: 'app-product-order-detail-dialog',
  standalone: true,
  imports: [
    DatePipe, CurrencyPipe
  ],
  templateUrl: './product-order-detail-dialog.component.html',
  styleUrl: './product-order-detail-dialog.component.scss'
})
export class ProductOrderDetailDialogComponent {

  readonly PaymentSupplierMeaning = PaymentSupplierMeaning;

  readonly OrderStatus = OrderStatus;

  order: Order;

  activeModal: NgbActiveModal;

  ngOnInit(): void {
    
  }

  dismissDialog() {
    this.activeModal.close();
  }
  
}
