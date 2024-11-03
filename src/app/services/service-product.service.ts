import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PetProduct } from '../product/pet-product.model';
import { PetProductOverviewResponse } from '../product/pet-product-overview-response.model';
import { ServiceProduct, ServiceProductType } from '../product/service-product.model';
import { ProductDetail } from '../product/product-detail.model';
import { getEnumName } from '../product/enum-name-getter';

@Injectable({
  providedIn: 'root',
})
export class ServiceProductService {

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/products/services`;
  }

  findById(id: number): Observable<ServiceProduct> {
    return this.http.get<ServiceProduct>(`${this.getBaseUri()}/${id}`);
  }

  findAll(): Observable<ServiceProduct[]> {
    return this.http.get<ServiceProduct[]>(`${this.getBaseUri()}`);
  }

  findAllByType(type: string): Observable<ServiceProduct[]> {
    return this.http.get<ServiceProduct[]>(`${this.getBaseUri()}/types/${getEnumName(type, ServiceProductType)}`);
  }

  add(service: ServiceProduct, productDetails: ProductDetail[], image?: File): Observable<ServiceProduct> {
    let formData: FormData = new FormData();
    let serviceProductData = new Blob([JSON.stringify(service)], {
      type: 'application/json',
    });
    formData.append("serviceProduct", serviceProductData);

    let productDetailsData = new Blob([JSON.stringify(productDetails)], {
      type: 'application/json',
    });
    formData.append("productDetails", productDetailsData);

    if (image) {
      formData.append("image", image);
    }
    
    return this.http.post<ServiceProduct>(`${this.getBaseUri()}`, formData);
  }

  // Not handle
  update(service: ServiceProduct, productDetails: ProductDetail[], image?: File): Observable<ServiceProduct> {
    let formData: FormData = new FormData();
    let serviceProductData = new Blob([JSON.stringify(service)], {
      type: 'application/json',
    });
    formData.append("serviceProduct", serviceProductData);

    let productDetailsData = new Blob([JSON.stringify(productDetails)], {
      type: 'application/json',
    });
    formData.append("productDetails", productDetailsData);

    if (image) {
      formData.append("image", image);
    }
    
    return this.http.put<ServiceProduct>(`${this.getBaseUri()}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getBaseUri()}/${id}`);
  }

}
