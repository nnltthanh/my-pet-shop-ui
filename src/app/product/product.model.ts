export class Product {
    constructor(
        public id: number,
        public name: string,
        public engName: string,
        public price: number,
        public description: string,
        // public imageData: ImageData,
        public imageData: string,
        public updatedAt: Date,
        public rate: number
    ) { }
}