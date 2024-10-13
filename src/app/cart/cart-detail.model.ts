import { User } from "../auth/user.model";
import { ProductDetail } from "../product/product-detail.model";
import { Cart } from "./cart.model";

export class CartDetail {
    id: number;
    quantity: number;
    total: number;
    cart: Cart;
    productDetail: ProductDetail;


    public constructor(cartDetail: Partial<CartDetail> = {}) {
        Object.assign(this, cartDetail);
    }
}