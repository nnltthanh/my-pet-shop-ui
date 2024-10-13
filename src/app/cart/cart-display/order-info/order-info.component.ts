import {
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderInfoCardComponent } from './order-info-card/order-info-card.component';
import { TimelineModule } from 'primeng/timeline';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { User } from '../../../auth/user.model';
import { CartDetail } from '../../cart-detail.model';
import { CartService } from '../../../services/cart.service';
import { AddressService } from '../../../services/address.service';
import { forkJoin } from 'rxjs';
import { Address } from '../../../auth/address.model';

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  id: string;
}

@Component({
  selector: 'app-order-info',
  standalone: true,
  imports: [
    OrderInfoComponent,
    FormsModule,
    TimelineModule,
    OrderInfoCardComponent,
    NgClass,
    ReactiveFormsModule,
    CurrencyPipe,
    AsyncPipe,
  ],
  templateUrl: './order-info.component.html',
  styleUrl: './order-info.component.scss',
})
export class OrderInfoComponent implements OnChanges {
  events: EventItem[];

  loggedInUser = input.required<User>();

  selectedCartDetails = input.required<CartDetail[]>();

  colorStatus = [
    {
      status: 'Not Complete',
      color: '#ffc107',
    },
    {
      status: 'Done',
      color: '#198754',
    },
    {
      status: 'No Info',
      color: '#adb5bd',
    },
  ];

  total: number = 0;

  shipAmount: number = 0;

  subTotal: number = 0;

  customerName: string;

  customerPhone: string;

  customerEmail: string;

  customerAddress: string;

  defaultAddress: Address;

  constructor(private cartService: CartService, private addressService: AddressService) {
    this.events = [
      {
        id: 'step-1',
        status: 'Thông tin người nhận',
        icon: 'pi pi-user',
        color: this.colorStatus[0].color,
      },
      {
        id: 'step-2',
        status: 'Thông tin đơn hàng',
        icon: 'pi pi-shopping-cart',
        color: this.colorStatus[0].color,
      },
      {
        id: 'step-3',
        status: 'Thông tin vận chuyển',
        icon: 'pi pi-truck',
        color: this.colorStatus[2].color,
      },
      {
        id: 'step-4',
        status: 'Thông tin thanh toán',
        icon: 'pi pi-wallet',
        color: this.colorStatus[0].color,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCartDetails']) {
      if (this.selectedCartDetails().length > 0) {
        this.events[1].color = this.colorStatus[1].color;
        this.shipAmount = 30000;
      } else {
        this.events[1].color = this.colorStatus[0].color;
        this.shipAmount = 0;
      }
      this.calculateShipAmount();
    }

    if (changes['loggedInUser']) {
      if (this.loggedInUser()) {
        this.customerEmail = this.loggedInUser().email;

        this.addressService.getDefaultAddressOfCustomer(1).subscribe(address => {
          
          if (!address) {
            this.customerName = this.loggedInUser().name;
            this.customerPhone = this.loggedInUser().phone;
            return;
          }

          this.defaultAddress = address;

          forkJoin({
            getCity: this.addressService.getCityById(address.cityId),
            getDistrict: this.addressService.getDistrictById(address.cityId, address.districtId),
            getWard: this.addressService.getWardById(address.districtId, address.wardId)
          })
          .subscribe(({getCity, getDistrict, getWard}) => {
            let city = getCity.data.find(x => +x.ProvinceID === +address.cityId)?.NameExtension[1];
            let district = getDistrict.data.find(x => +x.DistrictID === +address.districtId)?.DistrictName;
            let ward = getWard.data.find(x => x.WardCode === address.wardId)?.NameExtension[0];
  
            this.customerAddress =
            address.address +
            ', ' + ward +
            ', ' + district +
            ', ' + city;

            this.customerName = address.belongsTo;
            this.customerPhone = address.phone;
  
            this.events.forEach((event) => {
              if (event.id === "step-1") {
                event.color = this.colorStatus[1].color;
              }
            });
          });
          
        })
      }
    }

  }

  validate(eventId: string): boolean {
    var form = document.getElementsByClassName(
      'needs-validation'
    )[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      this.events.forEach((event) => {
        if (event.id === eventId) {
          event.color = this.colorStatus[0].color;
        }
      });
    } else {
      this.events.forEach((event) => {
        if (event.id === eventId) {
          event.color = this.colorStatus[1].color;
        }
      });
    }
    form.classList.add('was-validated');
    this.isValidToMakeOrder();
    return form.checkValidity();
  }

  public calculateShipAmount() {
    this.cartService.getShipCost(1, '2', 3, 4, '5').subscribe({
      next: (data) => {
        
        if ((data as any)['code'] == 200) {
          this.shipAmount = ((data as any)['data'] as any)['total'];
        } else {
          console.error(data);
          this.shipAmount = 0;
        }
        this.calculateTotal();
      },
      error: (err) => {
        this.shipAmount = 0;
        this.calculateTotal();
      },
    });
  }

  public calculateTotal() {
    this.total = 0;
    this.selectedCartDetails().forEach((item) => {
      this.total += item.total;
    });
    this.subTotal = this.total + this.shipAmount;

    if (this.total === 0 && this.shipAmount === 0 && this.subTotal === 0) {
      this.events[3].color = this.colorStatus[0].color;
    } else {
      this.events[3].color = this.colorStatus[1].color;
    }
    this.isValidToMakeOrder();
  }

  public isValidToMakeOrder(): boolean {
    return (
      !(this.total === 0 && this.shipAmount === 0 && this.subTotal === 0) &&
      this.events[0].color === this.colorStatus[1].color &&
      this.events[1].color === this.colorStatus[1].color &&
      this.events[3].color === this.colorStatus[1].color
    );
  }

  public goToPayment() {
    this.cartService.goToVNPayPayment("vnpay").subscribe({
      next: (data) => {
        if (data != null) {
          window.open(data, '_blank');
        }
      },
    });
  }
}
