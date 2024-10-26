import { InventoryStatus } from "./inventory-status.model";
import { PetServiceVariant } from "./pet-service-variant.model";
import { ImageData } from "./product-list-display/image-data.model";
import { Product } from "./product.model";

export class ProductDetail {
    id: number;
    quantity: number;
    price: number;
    sold: number;
    imageData: ImageData;
    inventoryStatus: InventoryStatus;
    product: Product;
    petServiceVariant: PetServiceVariant;

    public constructor(product: Partial<ProductDetail> = {}) {
        Object.assign(this, product);
    }
}