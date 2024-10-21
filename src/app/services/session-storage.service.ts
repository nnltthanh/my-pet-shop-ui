import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {


    public removeAll(): void {
        localStorage.clear();
    }

}