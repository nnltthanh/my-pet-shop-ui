import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { User } from '../../../../auth/user.model';
import { OrderDetail } from '../../../../product/order-detail.model';
import { Review } from '../../../../product/review.model';
import { ReviewService } from '../../../../services/review.service';
import { getLoggedInUserId } from '../../../../services/user.service';
import { ToastMessageService } from '../../../../sharing/toast-message/toast-message.service';

@Component({
  selector: 'app-user-review-product-feedback-dialog',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe],
  templateUrl: './user-review-product-feedback-dialog.component.html',
  styleUrl: './user-review-product-feedback-dialog.component.scss'
})
export class UserReviewProductFeedbackDialogComponent implements OnInit {

  activeModal!: NgbActiveModal;

  // order: Order;

  orderDetail: OrderDetail;

  reviewService = inject(ReviewService);

  rating: number;

  reviewContent: string;

  files: File[] = [];

  fileImages: string[] = [];

  isChecked: Observable<Review[]>;

  reviews: Review[] = [];

  toastMessageService = inject(ToastMessageService);

  ngOnInit(): void {
    this.isChecked = this.reviewService.findByOrderDetailId(0, this.orderDetail.id)
    .pipe(map((data) => {
      if (data && data.length > 0) {
        let images = data[0].imageData?.imageUrls?.split(",").filter(s => s).map(s => s.trim());
        if (images) {
          images.forEach(img => this.fileImages.push(img));
          this.fileImages = [...this.fileImages];
        }
        this.rating = data[0].rate;
        // this.reviewContent = data[0].content;

        this.reviews = [...data];
      }
      return data;
    }));
  }

  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(false);
  }

  public getImage(): string {
    return this.orderDetail.productDetail.imageData?.imageUrls || this.orderDetail.productDetail.product.imageData?.imageUrls;
  }

  onReview() {
    let review: Review = new Review();
    review.rate = this.rating;
    review.content = this.reviewContent;
    // review.imageData = this.imageData;
    review.customer = new User({id: getLoggedInUserId()});

    this.reviewService.create(0, this.orderDetail.id, review).subscribe({
      next: review => {
        this.toastMessageService.addSuccessfulMessage("Gửi đánh giá đơn hàng thành công");
        this.reviews.push(review);
        this.reviews = [... this.reviews];
        this.reviewContent = "";
      }
    })
  }

}
