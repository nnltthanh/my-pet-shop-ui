import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PetProduct } from '../product/pet-product.model';
import { Observable } from 'rxjs';
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
    return this.http.get<PetProductOverviewResponse>(`${this.getBaseUri()}/search`);
  }

  findAllBy(queryParams: HttpParams | null): Observable<PetProductOverviewResponse> {
    return queryParams === null ? this.findAll() :
      this.http.get<PetProductOverviewResponse>(`${this.getBaseUri()}/search`, { params: queryParams });
  }


}
