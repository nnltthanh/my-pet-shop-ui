import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProductDetail } from '../product/product-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http: HttpClient) { }

  findByProductId(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.getBaseUri()}/${id}`);
  }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/product-details`;
  }
}
