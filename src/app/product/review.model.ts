import { User } from "../auth/user.model";
import { OrderDetail } from "./order-detail.model";
import { ImageData } from "./product-list-display/image-data.model";

export class Review {
    id: number;
    content: string;
    rate: number;
    customer: User;
    employee: User;
    orderDetail: OrderDetail;
    imageData: ImageData;
    createDate: Date

    public constructor(review: Partial<Review> = {}) {
        Object.assign(this, review);
    }
}