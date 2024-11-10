import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export class StatisticOverview {
    public numberOfOrdersOfMonth: number;
    public revenueOfMonth: number;
    public numberOfProductsOfMonth: number;
    public numberOfServiceProductsOfMonth: number;
}

export class StatisticTimeData {
    labels: string[];
    period: StatisticFilterPeriod;
    previousNumberOfOrders: number[];
    currentNumberOfOrders: number[];
    previousNumberOfProducts: number[];
    currentNumberOfProducts: number[];
    previousNumberOfServices: number[];
    currentNumberOfServices: number[];
    previousTimeRevenue: number[];
    currentTimeRevenue: number[];
}

export enum StatisticFilterPeriod {
    YEAR = "YEAR",
    // QUARTER = "QUARTER",
    MONTH = "MONTH",
    WEEK = "WEEK",
}

export const StatisticFilterPeriodMeaning: Record<string, string> = {
    YEAR: "Năm",
    QUARTER: "Quý",
    MONTH: "Tháng",
    WEEK: "Tuần",
}

@Injectable({
    providedIn: 'root',
})
export class StatisticService {

    constructor(private http: HttpClient) { }

    findStatisticOverviewInCurrentMonth(): Observable<StatisticOverview> {
        return this.http.get<StatisticOverview>(`${this.getBaseUri()}`);
    }

    findStatisticOverviewByFilter(period: StatisticFilterPeriod): Observable<StatisticTimeData> {
        return this.http.get<StatisticTimeData>(`${this.getBaseUri()}/period/${period}`);
    }
    
    private getBaseUri(): string {
        return `${environment.BACKEND_URL}/statistic`;
    }

}