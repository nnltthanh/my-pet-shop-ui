export enum PetBreed {
    DOG = "Chó",
    CAT = "Mèo",
    HAMSTER = "Hamster"
}

export class PetCategory {
    constructor(
        public id: number,
        public name: string,
        public breed: PetBreed
    ) { }
}