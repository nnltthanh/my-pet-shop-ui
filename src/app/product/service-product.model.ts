import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
import { InventoryStatus } from "./inventory-status.model";
import { PetBreed, PetCategory } from "./pet-category.model";
import { ImageData } from "./product-list-display/image-data.model";
import { ProductDetail } from "./product-detail.model";
import { Product } from "./product.model";

export enum ServiceProductLevel {
    CLASSIC = "CLASSIC",
    SILVER = "SILVER",
    GOLD = "GOLD",
    DIAMOND = "DIAMOND"
}

export enum ServiceProductType {
    
    SPA_GROOMING = "Spa - Cắt tỉa lông",
    PET_HOTEL = "Khách sạn thú cưng",
    HOSPITAL = "Khám chữa bệnh",
    OTHER = "Khác",

}

export class ServiceProduct extends Product {
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
    override countRating: number;
    override rating: number;

    // public suitableFor: PetBreed;
    public type: ServiceProductType | string;
    public level: ServiceProductLevel;
    public petServices: any[];

    constructor() {
        super()
    }
    
}