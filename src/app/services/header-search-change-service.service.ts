import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class HeaderSearchChangeService {

    private keyword = new ReplaySubject<string>();

    public keyword$ = this.keyword.asObservable();

    public updateKeyword(keyword: string) {
        this.keyword.next(keyword);
    }

}