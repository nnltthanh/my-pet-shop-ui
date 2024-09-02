import { PetProduct } from "./pet-product.model";

export interface PetProductOverviewResponse {
    total: number,
    data: PetProduct[];
}