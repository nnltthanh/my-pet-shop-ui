import { ProductOverview } from "./product-overview.model";

export interface ProductOverviewResponse {
    total: number,
    data: ProductOverview[];
}