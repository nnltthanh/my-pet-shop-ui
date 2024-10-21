import { User } from "../auth/user.model";
import { OrderStatus } from "./order.model";
import { Payment } from "./payment.model";
import { Shipment } from "./shipment.model";

export class OrderCreationRequest {
    total: number;
    status: OrderStatus;
    payment: Payment;
    shipment: Shipment;
    // staff: User; 
    customerId: number;
    note: string;
    cartDetails: number[]

    public constructor(product: Partial<OrderCreationRequest> = {}) {
        Object.assign(this, product);
    }
}