import { Component, inject, input, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Review } from '../../review.model';
import { ReviewService } from '../../../services/review.service';
import { Product } from '../../product.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail-review-display',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-detail-review-display.component.html',
  styleUrl: './product-detail-review-display.component.scss'
})
export class ProductDetailReviewDisplayComponent implements OnInit {

  product = input<Product>();

  $reviews = new BehaviorSubject<Review[]>([]);

  reviewService = inject(ReviewService);

  averageStar: number = 0;

  overallRating: number = 0;

  ngOnInit(): void {
    console.log(this.product());
    
    if (this.product()) {
      this.reviewService.findAllByProductId(this.product()!.id)
        .pipe(map((data) => {
          console.log(data);
          
          this.$reviews.next(data);
          this.overallRating = data.length;
          data.forEach(r => {
            this.averageStar += r.rate;
          })
          this.averageStar = Number((this.averageStar / this.overallRating || 0).toFixed(1));
          return data;
        })).subscribe({})
    }

  }

}
