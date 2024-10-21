import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimelineModule } from 'primeng/timeline';
import { Address } from '../../../auth/address.model';
import { User } from '../../../auth/user.model';
import { OrderCreationRequest } from '../../../product/order-creation-request.model';
import { Order, OrderStatus } from '../../../product/order.model';
import { Shipment } from '../../../product/shipment.model';
import { AddressService } from '../../../services/address.service';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { CartDetail } from '../../cart-detail.model';
import { AddressBookSelectionDialogComponent } from './address-book-selection-dialog/address-book-selection-dialog.component';
import { OrderInfoCardComponent } from './order-info-card/order-info-card.component';
import { getLoggedInUserId, UserService } from '../../../services/user.service';

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

  addresses: Address[] = [];

  userService = inject(UserService);

  @ViewChild('customerInfoForm') customerInfoForm: NgForm;

  constructor(private cartService: CartService, private addressService: AddressService, private modalService: NgbModal, private orderService: OrderService) {
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

        this.addressService.getDefaultAddressOfCustomer(getLoggedInUserId()).subscribe(address => {

          if (!address) {
            this.defaultAddress = address;
            this.customerName = this.loggedInUser().name;
            this.customerPhone = this.loggedInUser().phone;
            return;
          }

          this.customerName = address.belongsTo;
          this.customerPhone = address.phone;
          this.customerAddress = address.displayingAddress;

          this.events.forEach((event) => {
            if (event.id === "step-1") {
              event.color = this.colorStatus[1].color;
            }
          });

        })
      }
    }

  }

  validate(eventId: string): boolean {
    var form = document.getElementsByClassName(
      'needs-validation'
    )[0] as HTMLFormElement;

    this.events.forEach((event) => {
      if (event.id === eventId) {
        if (form.checkValidity() === false) {
          event.color = this.colorStatus[0].color;
        } else {
          event.color = this.colorStatus[1].color;
        }
      }
    })

    this.events = [...this.events];

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

    if (this.total === 0) {
      this.shipAmount = 0;
      this.subTotal = 0;
      this.events[3].color = this.colorStatus[0].color;
      this.isValidToMakeOrder();
      return;
    }
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

  public placeOrder() {
    let orderRequest: OrderCreationRequest = new OrderCreationRequest({
      customerId: 1,
      status: OrderStatus.CREATED,
      total: this.subTotal,
      shipment: new Shipment({
        address: new Address({
          displayingAddress: this.customerAddress,
          phone: this.customerPhone,
          belongsTo: this.customerName
        }),
        shipCost: this.shipAmount,
      }),
      cartDetails: this.selectedCartDetails().map(cartDetail => cartDetail.id)
    });

    this.orderService.createOrder(getLoggedInUserId(), orderRequest).subscribe({
      next: (order) => {
        this.goToPayment(order);
      }
    })
  }

  public goToPayment(order: Order) {
    this.cartService.paymentByVNPay(order).subscribe({
      next: (data) => {
        if (data != null) {
          window.open(data);
        }
      },
    });
  }

  public openAddressBookDialog() {

    const modalRef = this.modalService.open(AddressBookSelectionDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
    });
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.defaultAddress = result;
          this.customerName = this.defaultAddress.belongsTo;
          this.customerPhone = this.defaultAddress.phone;
          this.customerAddress = this.defaultAddress.displayingAddress;
          this.customerInfoForm.setValue({
            "name": this.customerName,
            "phone": this.customerPhone,
            "email": this.customerEmail,
            "address": this.customerAddress
          });
          this.validate("step-1")
        }
      },
      (reason) => {
        if (
          reason == ModalDismissReasons.BACKDROP_CLICK ||
          reason == ModalDismissReasons.ESC
        ) {
        }
      })

  }
}
