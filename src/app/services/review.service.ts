import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Review } from '../product/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  public create(
    productId: number,
    orderDetailId: number,
    review: Review,
    images: File[]
  ): Observable<Review> {
    let formData: FormData = new FormData();
    let reviewData = new Blob([JSON.stringify(review)], {
      type: 'application/json',
    });
    formData.append('review', reviewData);
    if (images) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }
    return this.http.post<Review>(
      `${this.getBaseUri(productId)}/order-details/${orderDetailId}`,
      formData
    );
  }

  public findAll(customerId: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      `${this.getBaseUri(0)}/customer/${customerId}`
    );
  }

  public findByOrderDetailId(productId: number, orderDetailId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.getBaseUri(0)}/order-details/${orderDetailId}`);
  }

  public findAllByProductId(productId: number): Observable<Review[]>  {
    return this.http.get<Review[]>(`${this.getBaseUri(productId)}?all=false`);
}

  private getBaseUri(productId: number): string {
    return `${environment.BACKEND_URL}/products/${productId}/reviews`;
  }
}
