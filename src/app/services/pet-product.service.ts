import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PetProductService {

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/products/pets`;
  }


}
