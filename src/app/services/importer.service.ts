import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ImporterService {

    constructor(private http: HttpClient) { }

    importProducts(productType: string, importFile: File): Observable<any> {
        let formData: FormData = new FormData();
        if (importFile) {
            formData.append("importFile", importFile);
          }
        return this.http.post(`${this.getBaseUri()}`, formData, {responseType: 'text'});
    }

    private getBaseUri(): string {
        return `${environment.BACKEND_URL}/import`;
    }

}