import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../../../../auth/user.model';
import { OrderDetail } from '../../../../../product/order-detail.model';
import { Review } from '../../../../../product/review.model';
import { ReviewService } from '../../../../../services/review.service';
import { getLoggedInUserId } from '../../../../../services/user.service';

@Component({
  selector: 'app-user-order-review-add-card',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './user-order-review-add-card.component.html',
  styleUrl: './user-order-review-add-card.component.scss'
})
export class UserOrderReviewAddCardComponent implements OnInit {

  orderDetail = input.required<OrderDetail>();

  reviewService = inject(ReviewService);

  rating: number;

  reviewContent: string;

  files: File[] = [];

  fileImages: string[] = [];

  existingReview = new BehaviorSubject<Review[]>([]);

  isChecked: Observable<Review[]>;

  ngOnInit(): void {
    this.isChecked = this.reviewService.findByOrderDetailId(0, this.orderDetail().id)
    .pipe(map((data) => {
      this.existingReview.next(data);
      if (data && data.length > 0) {
        let images = data[0].imageData?.imageUrls?.split(",").filter(s => s).map(s => s.trim());
        if (images) {
          images.forEach(img => this.fileImages.push(img));
          this.fileImages = [...this.fileImages];
        }
        this.rating = data[0].rate;
        this.reviewContent = data[0].content;
      }
      return data;
    }));
  }

  onReview() {
    let review: Review = new Review();
    review.rate = this.rating;
    review.content = this.reviewContent;
    // review.imageData = this.imageData;
    review.customer = new User({id: getLoggedInUserId()});

    this.reviewService.create(0, this.orderDetail().id, review, this.files).subscribe({
      next: review => {
        console.log(review);
      }
    })
  }

  public getImage(): string {
    return this.orderDetail().productDetail.imageData?.imageUrls || this.orderDetail().productDetail.product.imageData?.imageUrls;
  }

  onRating(value: number) {
    if (this.isAlreadyReviewed()) {
      return;
    }
    this.rating = value;
    console.log(this.rating);
    
  }

  isAlreadyReviewed() {
    return this.existingReview.getValue() && this.existingReview.getValue()?.length > 0;
  }

  handleFileInputChange (event: Event) {
    const target = event.target as HTMLInputElement;
    let files = (event.target as HTMLInputElement).files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.files.push(file);
        this.fileImages.push(this.getFileImage(file));
      }
    }

    this.files = [... this.files];
    this.fileImages = [... this.fileImages];
  }

  removeImage(index: number) {
    this.files.splice(index, 1);
    this.fileImages = [];
    let files = this.files;
    this.files = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.files.push(file);
        this.fileImages.push(this.getFileImage(file));
      }
    }

    this.files = [... files];
    this.fileImages = [... this.fileImages];
  }

  getFileImage(image: File) {
    return URL.createObjectURL(image);
  }

}
