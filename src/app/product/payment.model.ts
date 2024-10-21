import { User } from "../auth/user.model";

export enum PaymentSupplier {

    CASH = "CASH",
    VN_PAY = "VN_PAY",
    // MOMO 
}

export class Payment {
    id: number;
    amount: number;
    status: string;
    // method: PaymentMethod;
    paymentUrl: string;
    customer: User;
    supplier: PaymentSupplier;



    public constructor(product: Partial<Payment> = {}) {
        Object.assign(this, product);
    }
}