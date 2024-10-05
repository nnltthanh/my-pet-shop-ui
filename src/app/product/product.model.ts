import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
import { InventoryStatus } from "./inventory-status.model";
import { PetCategory } from "./pet-category.model";
import { ImageData } from "./product-list-display/image-data.model";
import { ProductDetail } from "./product-detail.model";

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


    public constructor(product: Partial<Product> = {}) {
        Object.assign(this, product);
    }
}