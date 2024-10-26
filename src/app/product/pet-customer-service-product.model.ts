import { PetCustomer } from "./pet-customer.model";
import { ServiceProduct } from "./service-product.model";

export class PetCustomerServiceProduct {
    public serveFrom: Date;
    public serveTo: Date;
    public customerNote: string;
    public serveFor: PetCustomer;
    public serviceProduct: ServiceProduct;

    public constructor(product: Partial<PetCustomerServiceProduct> = {}) {
        Object.assign(this, product);
    }
    
}