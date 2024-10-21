import { Address } from "../auth/address.model";

export enum ShipmentStatus {
    SHIPPING = "Đang giao hàng",
    SHIPPED = "Đã giao hàng"
}

export class Shipment {
    id: number;
    shipDate: Date;
    status: ShipmentStatus;
    // method: string; 
    shipCost: number;
    address: Address;

    public constructor(product: Partial<Shipment> = {}) {
        Object.assign(this, product);
    }
}