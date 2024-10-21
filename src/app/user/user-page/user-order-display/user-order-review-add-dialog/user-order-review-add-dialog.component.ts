import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../../product/order.model';
import { Review } from '../../../../product/review.model';
import { UserOrderReviewAddCardComponent } from './user-order-review-add-card/user-order-review-add-card.component';

@Component({
  selector: 'app-user-order-review-add-dialog',
  standalone: true,
  imports: [UserOrderReviewAddCardComponent],
  templateUrl: './user-order-review-add-dialog.component.html',
  styleUrl: './user-order-review-add-dialog.component.scss'
})
export class UserOrderReviewAddDialogComponent {

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
