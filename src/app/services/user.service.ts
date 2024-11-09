import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../auth/user.model';


export const getLoggedInUserId = (): number => {
  return JSON.parse(localStorage.getItem("user")!).id;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  loggedInUser = new BehaviorSubject<User | undefined>(undefined);

  loggedInUser$ = this.loggedInUser.asObservable();

  constructor(private http: HttpClient) { }

  private getBaseUri(): string {
    return `${environment.BACKEND_URL}/users`;
  }

  findById(customerId: number): Observable<User> {
    return this.http.get<User>(`${this.getBaseUri()}/${customerId}`);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getBaseUri()}`);
  }

  getUsersInGroup(groupName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.getBaseUri()}/groups/${groupName}`);
  }

  getLoggedInUser(): User {
    if (localStorage.getItem("user")) {
      this.loggedInUser.next(JSON.parse(localStorage.getItem("user")!));
    } else {
      this.loggedInUser.next(undefined);
    }
    return JSON.parse(localStorage.getItem("user")!);
  }

  login(): Observable<User> {
    return this.http.get<User>(`${this.getBaseUri()}/login`)
    .pipe(tap((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      this.loggedInUser.next(user);
    }));
  }

  logout(): void {
    localStorage.removeItem("user");
    this.loggedInUser.next(undefined);
  }

  add(user: User, avatar: File | null): Observable<User> { // for admin -> not save to local storage
    let formData: FormData = new FormData();
    let userData = new Blob([JSON.stringify(user)], {
      type: 'application/json',
    });
    formData.append("user", userData);

    if (avatar) {
      formData.append("avatar", avatar);
    }
    return this.http.post<User>(`${this.getBaseUri()}`, formData);
  }

  update(id: number, user: User, avatar: File | null): Observable<User> {
    let formData: FormData = new FormData();
    let userData = new Blob([JSON.stringify(user)], {
      type: 'application/json',
    });
    formData.append("user", userData);

    if (avatar) {
      formData.append("avatar", avatar);
    }
    return this.http.put<User>(`${this.getBaseUri()}/basic-info/${id}`, formData)
      .pipe(map((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        this.loggedInUser.next(data);
        return data;
      }));
  }

  updatePartially(userId: number, fieldName: string, value: string) {
    return this.http.put<User>(`${this.getBaseUri()}/${userId}/fields/${fieldName}`, value)
      .pipe(map((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        this.loggedInUser.next(data);
        return data;
      }));
  }

}
