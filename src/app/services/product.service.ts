import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProductOverviewResponse } from '../product/product-overview-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ProductOverviewResponse> {
    return this.http.get<ProductOverviewResponse>(`${this.getBaseUri()}`);
  }

  findAllBy(queryParams: HttpParams | null): Observable<ProductOverviewResponse> {
    return queryParams === null ? this.findAll() :
      this.http.get<ProductOverviewResponse>(`${this.getBaseUri()}`, { params: queryParams });
  }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/products`;
  }
}
