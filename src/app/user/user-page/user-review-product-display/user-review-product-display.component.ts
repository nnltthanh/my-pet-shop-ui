import { Component, inject } from '@angular/core';
import { Review } from '../../../product/review.model';
import { ReviewService } from '../../../services/review.service';
import { map, Observable } from 'rxjs';
import { getLoggedInUserId } from '../../../services/user.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-review-product-display',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './user-review-product-display.component.html',
  styleUrl: './user-review-product-display.component.scss'
})
export class UserReviewProductDisplayComponent {

  reviewService = inject(ReviewService);

  $reviews: Observable<Review[]>;

  firstReviews: Review[] = [];

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

}
