import { User } from "../auth/user.model";
import { OrderDetail } from "./order-detail.model";
import { Payment } from "./payment.model";
import { Shipment } from "./shipment.model";

export enum OrderStatus {
    CREATED = "CREATED",
    PAYMENT = "PAYMENT",
    PROCESSING = "PROCESSING",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    ON_HOLD = "ON_HOLD",
    FINISHED = "FINISHED"
}

export const OrderStatusMeaning: Record<string, string> = {
    CREATED: "Tạo đơn",
    PAYMENT: "Đã thanh toán",
    PROCESSING: "Đang xử lý",
    SHIPPING: "Đang giao hàng",
    DELIVERED: "Đã giao hàng",
    CANCELLED: "Huỷ đơn",
    REFUNDED: "Hoàn tiền",
    ON_HOLD: "Tạm giữ",
    FINISHED: "Hoàn thành"
}

export class Order {
    id: number;
    total: number;
    status: OrderStatus;
    payment: Payment;
    shipment: Shipment;
    employee: User;
    customer: User;
    note: string;
    createDate: Date;
    orderDetails: OrderDetail[]

}