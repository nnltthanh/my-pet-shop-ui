import { ImageData } from "./product-list-display/image-data.model";

export class Product {
    constructor(
        public id: number,
        public name: string,
        public engName: string,
        public price: number,
        public description: string,
        public imageData: ImageData,
        public updatedAt: Date,
        public rate: number
    ) {
        rate = 1;
     }
}