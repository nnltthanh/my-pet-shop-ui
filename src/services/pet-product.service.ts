import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app/product/product.model';
import { PetProduct } from '../app/product/pet-product.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PetProductService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<PetProduct[]> {
    return this.http.get<PetProduct[]>(`${this.getBaseUri()}`);
  }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/products/pets`;
  }


}
