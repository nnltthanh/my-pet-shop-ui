import { InventoryStatus } from "./inventory-status.model";
import { ImageData } from "./product-list-display/image-data.model";

export class ProductDetail {
    id: number;
    quantity: number;
    price: number;
    sold: number;
    imageData: ImageData;
    inventoryStatus: InventoryStatus;

    public constructor(product: Partial<ProductDetail> = {}) {
        Object.assign(this, product);
    }
}