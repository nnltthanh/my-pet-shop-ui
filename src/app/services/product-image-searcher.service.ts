import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ProductImageSearcher {

    constructor(private http: HttpClient) { }

    predict(file: File) {
        let formData = new FormData();
        formData.append("image", file);
        return this.http.post<{prediction: string }>(this.getBaseUri(), formData);
    }

    private getBaseUri(): string {
        return `http://localhost:5000/predict`;
    }

}