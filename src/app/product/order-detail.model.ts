import { ProductDetail } from "./product-detail.model";

export class OrderDetail {
    id: number;
    quantity: number;
    total: number;
    productDetail: ProductDetail;

    public constructor(product: Partial<OrderDetail> = {}) {
        Object.assign(this, product);
    }
}