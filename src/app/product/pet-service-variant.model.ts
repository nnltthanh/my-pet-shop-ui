import { Gender } from "../gender.model";
import { HealthRecord } from "./health-record.model";
import { InventoryStatus } from "./inventory-status.model";
import { PetBreed, PetCategory } from "./pet-category.model";
import { ImageData } from "./product-list-display/image-data.model";
import { ProductDetail } from "./product-detail.model";

export enum PetServiceVariantName {

    WEIGHT = "Cân nặng",
    SIZE = "Kích cỡ",
    COLOR = "Màu sắc",
    TIME = "Thời gian",
    FURRY_LENGTH = "Độ dài lông",
    OTHER = "Khác"

}

export class PetServiceVariant {
    id: number;
    // suitableFor: PetBreed | string;
    variantName: PetServiceVariantName | string;
    variantValue: string;
    variantUnit: string;
    addPrice: number;

    public constructor(product: Partial<PetServiceVariant> = {}) {
        Object.assign(this, product);
    }
}