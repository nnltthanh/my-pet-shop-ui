import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PetProduct } from '../product/pet-product.model';
import { PetProductOverviewResponse } from '../product/pet-product-overview-response.model';

@Injectable({
  providedIn: 'root',
})
export class PetProductService {

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/products/pets`;
  }

  // findAll(): Observable<PetProductOverviewResponse> {
  //   return this.http.get<PetProductOverviewResponse>(`${this.getBaseUri()}`);
  // }

  findAll(): Observable<PetProductOverviewResponse> {
    return this.http.get<PetProductOverviewResponse>(`${this.getBaseUri()}`);
  }

  findAllBy(queryParams: HttpParams | null): Observable<PetProductOverviewResponse> {
    return queryParams === null ? this.findAll() :
      this.http.get<PetProductOverviewResponse>(`${this.getBaseUri()}`, { params: queryParams });
  }

  add(pet: PetProduct, image?: File): Observable<PetProduct> {
    let formData: FormData = new FormData();
    let petData = new Blob([JSON.stringify(pet)], {
      type: 'application/json',
    });
    formData.append("petProduct", petData);
    if (image) {
      formData.append("image", image);
    }
    return this.http.post<PetProduct>(`${this.getBaseUri()}`, formData);
  }

  update(id: number, pet: PetProduct, image?: File): Observable<PetProduct> {
    let formData: FormData = new FormData();
    let petData = new Blob([JSON.stringify(pet)], {
      type: 'application/json',
    });
    formData.append("petProduct", petData);
    if (image) {
      formData.append("image", image);
    }
    return this.http.put<PetProduct>(`${this.getBaseUri()}/${id}`, formData);
  }

}
