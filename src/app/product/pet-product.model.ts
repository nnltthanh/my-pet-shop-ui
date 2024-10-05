import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
import { InventoryStatus } from "./inventory-status.model";
import { PetCategory } from "./pet-category.model";
import { ImageData } from "./product-list-display/image-data.model";
import { Product } from "./product.model";

export class PetProduct extends Product {
    override id: number;
    override name: string;
    override engName: string;
    override price: number;
    override description: string;
    override imageData: ImageData;
    override updatedAt: Date;
    override rate: number;
    override inventoryStatus: InventoryStatus;
    override countSold: number;
    override weight: number;
    override age: number;
    override category: PetCategory;
    override gender: Gender;
    override origin: string;
    override dateOfBirth: Date | string;
    override color: string;
    override quantity: number;
    override latestHealthRecord: HealthRecord | null;
    override healthRecord: HealthRecord[]
    
    constructor() {
        super()
    }
}