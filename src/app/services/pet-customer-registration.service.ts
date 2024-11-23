import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { PetCustomerServiceProduct } from "../product/pet-customer-service-product.model";
import { Observable } from "rxjs";
import { ProductDetail } from "../product/product-detail.model";
import { OrderService } from "./order.service";

@Injectable({
  providedIn: 'root',
})
export class PetCustomerRegistrationService {

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/pet-customers/registration`;
  }

  reserve(registration: PetCustomerServiceProduct, productDetails: ProductDetail[]): Observable<PetCustomerServiceProduct> {
    let formData: FormData = new FormData();
    let registrationData = new Blob([JSON.stringify(registration)], {
      type: 'application/json',
    });
    formData.append("registration", registrationData);
    let productDetailsData = new Blob([JSON.stringify(productDetails)], {
      type: 'application/json',
    });
    formData.append("productDetails", productDetailsData);

    return this.http.post<PetCustomerServiceProduct>(this.getBaseUri(), formData);
  }

  findAllByCustomer(id: number): Observable<PetCustomerServiceProduct[]> {
    return this.http.get<PetCustomerServiceProduct[]>(`${this.getBaseUri()}/${id}`);
  }

  findAll(): Observable<PetCustomerServiceProduct[]> {
    return this.http.get<PetCustomerServiceProduct[]>(`${this.getBaseUri()}`);
  }

}