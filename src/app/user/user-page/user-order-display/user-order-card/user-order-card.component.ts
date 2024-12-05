import { Component, inject, input, model } from '@angular/core';
import { Order, OrderStatus, OrderStatusMeaning } from '../../../../product/order.model';
import { UserOrderDetailCardComponent } from './user-order-detail-card/user-order-detail-card.component';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import { ReviewService } from '../../../../services/review.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOrderReviewAddDialogComponent } from '../user-order-review-add-dialog/user-order-review-add-dialog.component';
import { getLoggedInUserId } from '../../../../services/user.service';
import { ToastMessageService } from '../../../../sharing/toast-message/toast-message.service';

@Component({
  selector: 'app-user-order-card',
  standalone: true,
  imports: [UserOrderDetailCardComponent, CurrencyPipe],
  templateUrl: './user-order-card.component.html',
  styleUrl: './user-order-card.component.scss'
})
export class UserOrderCardComponent {

  readonly OrderStatusMeaning = OrderStatusMeaning;

  readonly OrderStatus = OrderStatus;

  order = model<Order>();
  
  modalService = inject(NgbModal);

  orderService = inject(OrderService);

  toastMessageService = inject(ToastMessageService);

  cancelOrder() {
    let order = this.order();
    order!.status = OrderStatus.CANCELLED;
    this.orderService.update(getLoggedInUserId(), order!).subscribe({
      next: (data) => {
        this.order.set(data);
        this.toastMessageService.addSuccessfulMessage("Đã huỷ đơn hàng thành công");
      }
    });
  }

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
