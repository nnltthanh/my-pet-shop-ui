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
    gender: string;
    origin: string;
    
    constructor() {
        super()
    }
}