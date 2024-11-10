import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { User } from '../../../auth/user.model';
import { OrderDetail } from '../../../product/order-detail.model';
import { ReviewService } from '../../../services/review.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Review } from '../../../product/review.model';
import { Order } from '../../../product/order.model';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { getLoggedInUserId } from '../../../services/user.service';

@Component({
  selector: 'app-product-order-detail-review-reply-card',
  standalone: true,
  imports: [FormsModule, AsyncPipe, DatePipe],
  templateUrl: './product-order-detail-review-reply-card.component.html',
  styleUrl: './product-order-detail-review-reply-card.component.scss'
})
export class ProductOrderDetailReviewReplyCardComponent implements OnInit {

  orderDetail = input.required<OrderDetail>();

  order = input.required<Order>();

  reviewService = inject(ReviewService);

  rating: number;

  reviewContent: string;

  files: File[] = [];

  fileImages: string[] = [];

  isChecked: Observable<Review[]>;

  reviews: Review[] = [];

  ngOnInit(): void {
    this.isChecked = this.reviewService.findByOrderDetailId(0, this.orderDetail().id)
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

  onReview() {
    let review: Review = new Review();
    // review.rate = this.rating;
    review.content = this.reviewContent;
    // review.imageData = this.imageData;
    review.employee = new User({id: getLoggedInUserId() });

    this.reviewService.create(0, this.orderDetail().id, review).subscribe({
      next: review => {
        this.reviews.push(review);
        this.reviews = [... this.reviews];
        this.reviewContent = "";
      }
    })
  }

  public getImage(): string {
    return this.orderDetail().productDetail.imageData?.imageUrls || this.orderDetail().productDetail.product.imageData?.imageUrls;
  }
}
