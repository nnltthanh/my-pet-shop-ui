import { ImageData } from "./product-list-display/image-data.model";
import { Product } from "./product.model";

export class PetProduct extends Product {
    constructor(
        public override id: number,
        public override name: string,
        public override engName: string,
        public override price: number,
        public override description: string,
        public override imageData: ImageData,
        public override updatedAt: Date,
        public override rate: number,
        public weight: number,
        public age: number,
        public category: string,
        public gender: string,
        public origin: string,
    ) {
        super(id, name, engName, price, description, imageData, updatedAt, rate);
    }
}