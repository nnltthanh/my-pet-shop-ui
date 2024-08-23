import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app/product/product.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.getBaseUri()}`);
  }

  findAllBy(queryParams: HttpParams | null): Observable<Product[]> {
    console.log(queryParams);
    
    return queryParams === null ? this.findAll() :
      this.http.get<Product[]>(`${this.getBaseUri()}`, { params: queryParams });
  }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/products`;
  }
}
