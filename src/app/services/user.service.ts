import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../auth/user.model';


export const getLoggedInUserId = (): number => {
  return JSON.parse(localStorage.getItem("user")!).id;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/users`;
  }

//   findAll(customerId: number): Observable<PetProductOverviewResponse> {
//     return this.http.get<PetProductOverviewResponse>(`${this.getBaseUri(customerId)}`);
//   }

//   findAllBy(customerId: number, queryParams: HttpParams | null): Observable<PetProductOverviewResponse> {
//     return queryParams === null ? this.findAll(customerId) :
//       this.http.get<PetProductOverviewResponse>(`${this.getBaseUri(customerId)}`, { params: queryParams });
//   }

  findById(customerId: number): Observable<User> {
    return this.http.get<User>(`${this.getBaseUri()}/${customerId}`);
  }

  getLoggedInUser(): User {
    if (!localStorage.getItem("user")) {
      this.findById(1).subscribe({
        next: user => {
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
    }
    return JSON.parse(localStorage.getItem("user")!);
  }



//   update(customerId: number, id: number, pet: PetProduct, image?: File): Observable<PetProduct> {
//     console.log("update", pet);
    
//     let formData: FormData = new FormData();
//     let petData = new Blob([JSON.stringify(pet)], {
//       type: 'application/json',
//     });
//     formData.append("petProduct", petData);
//     if (image) {
//       formData.append("image", image);
//     }
//     return this.http.put<PetProduct>(`${this.getBaseUri(customerId)}/${id}`, formData);
//   }

}
