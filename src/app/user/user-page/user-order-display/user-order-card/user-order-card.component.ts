import { Component, inject, input } from '@angular/core';
import { Order } from '../../../../product/order.model';
import { UserOrderDetailCardComponent } from './user-order-detail-card/user-order-detail-card.component';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import { ReviewService } from '../../../../services/review.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOrderReviewAddDialogComponent } from '../user-order-review-add-dialog/user-order-review-add-dialog.component';

@Component({
  selector: 'app-user-order-card',
  standalone: true,
  imports: [UserOrderDetailCardComponent, CurrencyPipe],
  templateUrl: './user-order-card.component.html',
  styleUrl: './user-order-card.component.scss'
})
export class UserOrderCardComponent {

  order = input<Order>();
  
  modalService = inject(NgbModal);

  onReviewOrder() {
    const modalRef = this.modalService.open(UserOrderReviewAddDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: "lg"
    });

    modalRef.componentInstance.order = this.order();
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        
      },
      (reason) => {
        if (
          reason == ModalDismissReasons.BACKDROP_CLICK ||
          reason == ModalDismissReasons.ESC
        ) {
        }
      })
  }

}
