import { User } from "../auth/user.model";
import { CartDetail } from "./cart-detail.model";

export class Cart {
    id: number;
    customer: User;
    cartDetails: CartDetail[]


    public constructor(cart: Partial<Cart> = {}) {
        Object.assign(this, cart);
    }
}