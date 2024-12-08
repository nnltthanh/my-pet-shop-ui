import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CartDetail } from '../cart/cart-detail.model';
import { Order } from '../product/order.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  customerCartNumber = new BehaviorSubject<number>(-1);

  customerCartNumber$ = this.customerCartNumber.asObservable();

  constructor(private http: HttpClient) {}

  private getBaseUri(customerId: number): string {
    return `${environment.BACKEND_URL}/customers/${customerId}/cart`;
  }

  addToCart(
    customerId: number,
    cartDetail: CartDetail | null
  ): Observable<CartDetail> {
    return this.http.post<CartDetail>(
      `${this.getBaseUri(customerId)}`,
      cartDetail
    ).pipe(tap((data) => {
      this.getCart(customerId).subscribe({
        complete: () => {}
      });
    }));
  }

  getCart(customerId: number): Observable<CartDetail[]> {
    return this.http.get<CartDetail[]>(`${this.getBaseUri(customerId)}`)
      .pipe(tap((data) => {
        this.setCartNumber(data?.length);
      }));
  }

  setCartNumber(value: number) {
    this.customerCartNumber.next(value);
  }

  getCartNumber(): Observable<number> {
    return this.customerCartNumber$;
  }

  update(customerId: number, cartDetail: CartDetail): Observable<CartDetail> {
    return this.http.put<CartDetail>(
      `${this.getBaseUri(customerId)}`,
      cartDetail
    );
  }

  paymentByVNPay(order: Order) {
    let data = {
      amount: order.total,
      method: 'vnpay',
      status: 'PENDING',
    };

    // localStorage.setItem('amount', this.subTotal.value);

    // localStorage.setItem('cartDetails', this.cartDetailsToOrder.value.toString());

    // const regularArray = localStorage.getItem('cartDetails')!.split(',');

    // await axios.post(`${baseUri}/customers/${this.customerId}/orders/${this.orderId.value}`, regularArray);

    return this.http.post(
      `${environment.BACKEND_URL}/payment/${order.id}/vnpay`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        responseType: 'text',
      }
    );
  }

  paymentByCOD(orderId: Number) {
    const baseUri = `${environment.BACKEND_URL}`;
    let data = {
      amount: 10000,
      method: 'COD',
      status: 'COD',
    };

    return this.http.post(`${baseUri}/payment/${orderId}/cod`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    });
  }

  getShipCost(
    fromDistrictId: number,
    fromWardCode: string,
    serviceId: number,
    toDistrictId: number,
    toWardCode: string
  ) {
    fromDistrictId = 1572;
    fromWardCode = '550113';
    serviceId = 53321;
    toDistrictId = 1452;
    toWardCode = '21012';

    let data = {
      from_district_id: fromDistrictId,
      from_ward_code: fromWardCode,
      service_id: serviceId,
      service_type_id: null,
      to_district_id: toDistrictId,
      to_ward_code: toWardCode,
      height: 50,
      length: 20,
      weight: 10,
      width: 20,
      insurance_value: 10000,
      cod_failed_amount: 2000,
      coupon: null,
    };
    return this.http.post(`${this.getGHNUri()}/v2/shipping-order/fee`, data, {
      headers: {
        'Content-Type': 'application/json',
        Token: '726cd839-e9d8-11ee-b1d4-92b443b7a897',
        ShopId: '194747',
      },
    });
  }

  delete(customerId: number, cartDetailId: number) {
    return this.http.delete(`${this.getBaseUri(customerId)}/${cartDetailId}`)
    .pipe((tap(() => this.setCartNumber(this.customerCartNumber.getValue() - 1))));
  }

  getGHNUri() {
    return `https://dev-online-gateway.ghn.vn/shiip/public-api`;
  }
}
