import { Order } from "./order.model";
import { PetCustomer } from "./pet-customer.model";
import { ServiceProduct } from "./service-product.model";

export class PetCustomerServiceProduct {
    public serveFrom: Date | string;
    public serveTo: Date | string;
    public customerNote: string;
    public serveFor: PetCustomer;
    public serviceProduct: ServiceProduct;
    public title: string;
    public start: Date | string;
    public end: Date | string;
    public id: number;
    public order: Order;

    public constructor(product: Partial<PetCustomerServiceProduct> = {}) {
        Object.assign(this, product);
    }
    
}