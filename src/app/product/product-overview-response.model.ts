import { Product } from "./product.model";

export interface ProductOverviewResponse {
    total: number,
    data: Product[];
}