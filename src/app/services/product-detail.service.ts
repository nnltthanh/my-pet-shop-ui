import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http: HttpClient) { }

  findByProductId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.getBaseUri()}/${id}`);
  }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/product-details`;
  }
}
