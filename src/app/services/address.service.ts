import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Address } from "../auth/address.model";
import { Injectable } from "@angular/core";
import { DistrictGHN, ProvinceGHN, WardGHN } from "../auth/province.model";

@Injectable({
    providedIn: 'root',
})
export class AddressService {

    constructor(private http: HttpClient) { }

    public postAddress(address: Address) {
        return this.http.post(`${this.getBaseUri()}`, address);
    }

    public getAddressesByCustomerId(customerId: number) {
        return this.http.get<Address[]>(`${this.getBaseUri()}/customer/${customerId}`);
    }


    public getDefaultAddressOfCustomer(customerId: number) {
        return (this.http.get<Address>(`${this.getBaseUri()}/customer/${customerId}/default`));
    }

    public updateAddress(id: number, address: Address) {
        return this.http.put<void>(`${this.getBaseUri()}/customer/${id}`, address);
    }

    public deleteAddress(id: number) {
        return this.http.delete(`${this.getBaseUri()}/${id}`);
    }

    getCity() {
        return (this.http.get<{
            code: number,
            message: string,
            data: ProvinceGHN[]
        }>(`${this.getGHNUri()}/master-data/province`, {
            headers: {
                "Content-Type": "application/json",
                "Token": "726cd839-e9d8-11ee-b1d4-92b443b7a897",
                "ShopId": "194747"
            }
        }));

    }

    getCityById(cityId: number) {
        return this.http.get<{
            code: number,
            message: string,
            data: ProvinceGHN[]
        }>(`${this.getGHNUri()}/master-data/province`, {
            headers: {
                "Content-Type": "application/json",
                "Token": "726cd839-e9d8-11ee-b1d4-92b443b7a897",
                "ShopId": "194747"
            }
        });

        // return cities.data.data.find(x => x.ProvinceID.toString() === cityId);

    }

    getDistrict(cityId: string) {
        return (this.http.get<{
            code: number,
            message: string,
            data: DistrictGHN[]
        }>(`${this.getGHNUri()}/master-data/district`, {
            headers: {
                "Content-Type": "application/json",
                "Token": "726cd839-e9d8-11ee-b1d4-92b443b7a897",
                "ShopId": "194747"
            },
            params: {
                "province_id": cityId,
            }
        }));

    }

    getDistrictById(cityId: number, districtId: number) {
        return this.http.get<{
            code: number,
            message: string,
            data: DistrictGHN[]
        }>(`${this.getGHNUri()}/master-data/district`, {
            headers: {
                "Content-Type": "application/json",
                "Token": "726cd839-e9d8-11ee-b1d4-92b443b7a897",
                "ShopId": "194747"
            },
            params: {
                "province_id": cityId,
            }
        });

        // return districts.data.data.find(x => x.DistrictID.toString() === districtId.toString());
    }

    getWard(districtId: string) {
        return (this.http.get<{
            code: number,
            message: string,
            data: WardGHN[]
        }>(`${this.getGHNUri()}/master-data/ward`, {
            headers: {
                "Content-Type": "application/json",
                "Token": "726cd839-e9d8-11ee-b1d4-92b443b7a897",
                "ShopId": "194747"
            },
            params: {
                "district_id": districtId,
            }
        }));

    }

    getWardById(districtId: number, wardCode: string) {
        return this.http.get<{
            code: number,
            message: string,
            data: WardGHN[]
        }>(`${this.getGHNUri()}/master-data/ward`, {
            headers: {
                "Content-Type": "application/json",
                "Token": "726cd839-e9d8-11ee-b1d4-92b443b7a897",
                "ShopId": "194747"
            },
            params: {
                "district_id": districtId,
            }
        });

        // return wards.data.data.find(x => x.WardCode.toString() === wardId.toString());
    }

    private getBaseUri(): string {
        return `${environment.BACKEND_URL}/addresses`;
    }

    getGHNUri() {
        return `https://dev-online-gateway.ghn.vn/shiip/public-api`;
    }
}