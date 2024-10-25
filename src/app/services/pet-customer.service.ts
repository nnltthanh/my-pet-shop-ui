import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PetCustomer } from '../product/pet-customer.model';

@Injectable({
  providedIn: 'root',
})
export class PetCustomerService {

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/my-pets`;
  }

  findAllByCustomer(customerId: number): Observable<PetCustomer[]> {
    return this.http.get<PetCustomer[]>(`${this.getBaseUri()}/customers/${customerId}`);
  }

  findById(petCustomerId: number): Observable<PetCustomer> {
    return this.http.get<PetCustomer>(`${this.getBaseUri()}/${petCustomerId}`);
  }

  add(pet: PetCustomer, image?: File): Observable<PetCustomer> {
    let formData: FormData = new FormData();
    let petData = new Blob([JSON.stringify(pet)], {
      type: 'application/json',
    });
    formData.append("petCustomer", petData);
    if (image) {
      formData.append("image", image);
    }
    return this.http.post<PetCustomer>(`${this.getBaseUri()}`, formData);
  }

  update(id: number, pet: PetCustomer, image?: File): Observable<PetCustomer> {
    console.log("update");
    
    let formData: FormData = new FormData();
    let petData = new Blob([JSON.stringify(pet)], {
      type: 'application/json',
    });
    formData.append("petCustomer", petData);
    if (image) {
      formData.append("image", image);
    }
    return this.http.put<PetCustomer>(`${this.getBaseUri()}/${id}`, formData);
  }

}
