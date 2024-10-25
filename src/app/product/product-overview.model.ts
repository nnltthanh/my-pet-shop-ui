import { ImageData } from "./product-list-display/image-data.model";

export class ProductOverview {
    constructor(
        public id: number,
        public name: string,
        public engName: string,
        public price: number,
        public description: string,
        public imageData: ImageData,
        public updatedAt: Date,
        public countRating: number,
        public rating: number,
        public countSold: number,
    ) { }
}