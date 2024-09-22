import { ImageData } from "./product-list-display/image-data.model";

export class Product {
    id: number;
    name: string;
    engName: string;
    price: number;
    description: string;
    imageData: ImageData;
    updatedAt: Date;
    rate: number;


    public constructor(product: Partial<Product> = {}) {
        Object.assign(this, product);
    }
}