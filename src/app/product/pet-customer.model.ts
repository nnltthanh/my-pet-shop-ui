import { User } from "../auth/user.model";
import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
import { InventoryStatus } from "./inventory-status.model";
import { PetCategory } from "./pet-category.model";
import { ImageData } from "./product-list-display/image-data.model";

export class PetCustomer {
    public id: number;
    public name: string;
    public engName: string;
    public price: number;
    public description: string;
    public imageData: ImageData;
    public updatedAt: Date;
    public rate: number;
    public inventoryStatus: InventoryStatus;
    public countSold: number;
    public weight: number;
    public age: number;
    public category: PetCategory;
    public gender: Gender;
    public origin: string;
    public dateOfBirth: Date | string;
    public color: string;
    public quantity: number;
    public latestHealthRecord: HealthRecord | null;
    public healthRecord: HealthRecord[]
    public countRating: number;
    public rating: number;
    public createdAt: Date | string;
    public customer: User

}