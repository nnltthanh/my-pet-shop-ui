import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../product/order.model';
import { Review } from '../../../product/review.model';
import { ProductOrderDetailReviewReplyCardComponent } from '../product-order-detail-review-reply-card/product-order-detail-review-reply-card.component';

@Component({
  selector: 'app-product-order-detail-review-reply',
  standalone: true,
  imports: [ProductOrderDetailReviewReplyCardComponent],
  templateUrl: './product-order-detail-review-reply.component.html',
  styleUrl: './product-order-detail-review-reply.component.scss'
})
export class ProductOrderDetailReviewReplyComponent {

  activeModal!: NgbActiveModal;

  order: Order;

  reviews: Review[];

  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(false);
  }

}
