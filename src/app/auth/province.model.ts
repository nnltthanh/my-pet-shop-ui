export class ProvinceGHN {
    CountryID: number;
    NameExtension: string[];
    ProvinceID: number;
    ProvinceName: string;
    selectedNameExtension: string
}

export class DistrictGHN {
    DistrictName: string;
    DistrictID: number;
    ProvinceID: number;
    selectedNameExtension: string;
}

export class WardGHN {
    WardName: string;
    WardCode: string;
    NameExtension: string[];
    DistrictID: number;
    selectedNameExtension: string
}