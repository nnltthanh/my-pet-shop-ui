import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../auth/user.model';


export const getLoggedInUserId = (): number => {
  return JSON.parse(localStorage.getItem("user")!).id;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  loggedInUser: User;

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/users`;
  }

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

  update(id: number, user: User): Observable<User> {
    // let formData = new FormData();
    // let userData = new Blob([JSON.stringify(user)], {
    //   type: 'application/json',
    // });
    // formData.append("petProduct", userData);
    return this.http.put<User>(`${this.getBaseUri()}/basic-info/${id}`, user)
    .pipe(map((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    }));
  }

}
