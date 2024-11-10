import { Component, inject, OnInit } from '@angular/core';
import { Review } from '../../../product/review.model';
import { ReviewService } from '../../../services/review.service';
import { map, Observable } from 'rxjs';
import { getLoggedInUserId } from '../../../services/user.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserReviewProductFeedbackDialogComponent } from './user-review-product-feedback-dialog/user-review-product-feedback-dialog.component';

@Component({
  selector: 'app-user-review-product-display',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './user-review-product-display.component.html',
  styleUrl: './user-review-product-display.component.scss'
})
export class UserReviewProductDisplayComponent implements OnInit {

  reviewService = inject(ReviewService);

  $reviews: Observable<Review[]>;

  firstReviews: Review[] = [];

  modalService = inject(NgbModal);

  ngOnInit(): void {
    this.$reviews = this.reviewService.findAll(getLoggedInUserId())
    .pipe(map(data => {
      this.firstReviews = data.reverse().reduce((accumulator: Review[], current: Review) => {
        let exists = accumulator.find(item => {
          return item.orderDetail.id === current.orderDetail.id;
        });
        if (!exists) {
          accumulator = accumulator.concat(current);
        }
        return accumulator;
      }, [])
      .reverse();
      this.firstReviews = [... this.firstReviews];
      return data;
    }));
  }

  public getImage(review: Review): string {
    return review.orderDetail?.productDetail.imageData?.imageUrls || review.orderDetail?.productDetail.product.imageData?.imageUrls || '';
  }

  public isPet(review: Review): boolean {
    return !!review.orderDetail!.productDetail.product && review.orderDetail!.productDetail.product?.category !== null;
  }

  public getImageUrls(review: Review): string[] {
    if (review.imageData && review.imageData.imageUrls) {
      return review.imageData.imageUrls.split(",").filter(s=>s).map(s=>s.trim());
    }
    return [];
  }

  onOpenReviews(review: Review) {
    const modalRef = this.modalService.open(UserReviewProductFeedbackDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    
    modalRef.componentInstance.orderDetail = review.orderDetail;
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
        }
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
