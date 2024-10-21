import { User } from "../auth/user.model";
import { OrderDetail } from "./order-detail.model";
import { Payment } from "./payment.model";
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

export class Order {
    id: number;
    total: number;
    status: OrderStatus;
    payment: Payment;
    shipment: Shipment;
    // staff: User; 
    customer: User;
    note: string;
    orderDetails: OrderDetail[]


    public constructor(product: Partial<Order> = {}) {
        Object.assign(this, product);
    }
}