
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Order } from '../product/order.model';
import { OrderCreationRequest } from '../product/order-creation-request.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient) { }

    public createOrder(customerId: number, order: OrderCreationRequest): Observable<Order> {
        return this.http.post<Order>(`${this.getBaseUri(customerId)}`, order);
    }

    public findAll(customerId: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.getBaseUri(customerId)}`);
    }

    public findById(customerId: number, orderId: number): Observable<Order> {
        return this.http.get<Order>(`${this.getBaseUri(customerId)}/${orderId}`);
    }

    public update(customerId: number, order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.getBaseUri(customerId)}/${order.id}`, order);
    }

    private getBaseUri(customerId: number): string {
        return `${environment.BACKEND_URL}/customers/${customerId}/orders`;
    }

}