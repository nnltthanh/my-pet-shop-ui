import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
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
    weight: number;
    age: number;
    category: PetCategory;
    gender: Gender;
    origin: string;
    dateOfBirth: Date | string;
    color: string;
    quantity: number;
    latestHealthRecord: HealthRecord | null;
    healthRecord: HealthRecord[]
    
    constructor() {
        super()
    }
}