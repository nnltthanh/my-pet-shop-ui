import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
import { InventoryStatus } from "./inventory-status.model";
import { PetCategory } from "./pet-category.model";
import { ImageData } from "./product-list-display/image-data.model";
import { ProductDetail } from "./product-detail.model";
import { ProductOverview } from "./product-overview.model";

export class Product {
    id: number;
    name: string;
    engName: string;
    price: number;
    description: string;
    imageData: ImageData;
    updatedAt: Date;
    rate: number;
    inventoryStatus: InventoryStatus;
    countSold: number;
    weight: number;
    age: number;
    category: PetCategory;
    gender: Gender;
    origin: string;
    dateOfBirth: Date | string;
    color: string;
    quantity: number;
    latestHealthRecord: HealthRecord | null;
    healthRecord: HealthRecord[];
    productDetails: ProductDetail[];
    public countRating: number;
    public rating: number;

    public constructor(product: Partial<Product> = {}) {
        Object.assign(this, product);
    }

}
export const overviewFromDetail = (product: Product): ProductOverview => {
    return new ProductOverview(
        product.id,
        product.name,
        product.engName,
        product.price,
        product.description,
        product.imageData,
        product.updatedAt,
        product.countRating,
        product.rating,
        product.countSold
    );
}