import { User } from "../auth/user.model";
import { Payment } from "./payment.model";
import { ProductDetail } from "./product-detail.model";
import { Shipment } from "./shipment.model";

export enum OrderStatus {
    CREATED = "CREATED",
    PAYMENT = "PAYMENT",
    STAFF_PROCESSING = "STAFF_PROCESSING",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    ON_HOLD = "ON_HOLD"
}

export class OrderDetail {
    id: number;
    quantity: number;
    total: number;
    productDetail: ProductDetail;

    public constructor(product: Partial<OrderDetail> = {}) {
        Object.assign(this, product);
    }
}