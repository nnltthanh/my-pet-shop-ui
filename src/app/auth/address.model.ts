import { User } from "./user.model";

export class Address {
    id: number;
    belongsTo: string;
    phone: string;
    address: string;
    cityId: number;
    districtId: number;
    wardId: string;
    customer: User;
    isDefault: boolean;
    displayingAddress: string;

    public constructor(user: Partial<Address> = {}) {
        Object.assign(this, user);
    }

}