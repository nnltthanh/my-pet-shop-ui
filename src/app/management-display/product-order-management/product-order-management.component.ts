import { CurrencyPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InventoryStatus } from '../../product/inventory-status.model';
import { Order, OrderStatus } from '../../product/order.model';
import { OrderService } from '../../services/order.service';
import { PetBreed } from '../../product/pet-category.model';
import { DropdownModule } from 'primeng/dropdown';
import { User } from '../../auth/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-product-order-management',
  standalone: true,
  imports: [
    TableModule,
    InputNumberModule,
    FormsModule,
    TagModule,
    RatingModule,
    CurrencyPipe,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    NgIf,
    NgFor,
    JsonPipe
  ],
  templateUrl: './product-order-management.component.html',
  styleUrl: './product-order-management.component.scss'
})
export class ProductOrderManagementComponent {

  readonly petBreed = PetBreed;

  readonly OrderStatus = OrderStatus;

  readonly statuses = Object.values(OrderStatus);

  editing: boolean = true;

  OrderDialog: boolean = false;

  addOrderDialog: boolean = false;

  // OrderDetailDialog: boolean = false;

  total: number = 0;

  orders: Order[] = [];

  order: Order;

  selectedOrders: Order[] = [];

  // Orders!: PetOrder[];

  // Order!: PetOrder;

  // selectedOrders!: PetOrder[] | null;

  submitted: boolean = false;

  displayingOrderStatus: string = '';

  imagePath: any;

  currentTableLazyLoadEvent: TableLazyLoadEvent;

  receptionists: User[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
 
  ngOnInit() {

    this.userService.getUsersInGroup("RECEPTIONIST_STAFF")
      .subscribe((data) => {
        this.receptionists = data;
      })

    this.orderService
      .getAll()
      .subscribe((data) => {
        // this.Orders = [...data.data];
        // this.total = data.total;
        this.orders = data;
        this.total = data.length;
      });
  }

  openNew() {
    // this.Order = null;
    this.submitted = false;
    this.addOrderDialog = true;
  }

  deleteSelectedOrders() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected Orders?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.Orders = this.Orders.filter((val) => !this.selectedOrders?.includes(val));
    //         this.selectedOrders = null;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Orders Deleted', life: 3000 });
    //     }
    // });
  }

  editOrder(order: Order) {
    this.order = { ...order };
    this.OrderDialog = true;
  }

  cancelOrder(order: Order) {
    // this.orderService.delete(order.id).subscribe({
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    //   complete: () => {
    //     this.loadOrders(this.currentTableLazyLoadEvent);
    //   },
    // });
  }

  onSubmitted(event: boolean) {
    if (event) {
      this.loadOrders(this.currentTableLazyLoadEvent);
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.Orders.length; i++) {
    //     if (this.Orders[i].id === id) {
    //         index = i;
    //         break;
    //     }
    // }

    return index;
  }

  getSeverityOrderStatus(status: string) {
    switch ((OrderStatus as any)[status]) {
      case OrderStatus.DELIVERED:
        this.displayingOrderStatus = OrderStatus.DELIVERED;
        return 'success';
      case OrderStatus.SHIPPING:
        this.displayingOrderStatus = OrderStatus.SHIPPING;
        return 'success';
      case OrderStatus.CREATED:
        this.displayingOrderStatus = OrderStatus.CREATED;
        return 'success';
      case OrderStatus.STAFF_PROCESSING:
        this.displayingOrderStatus = OrderStatus.STAFF_PROCESSING;
        return 'info';
      case OrderStatus.ON_HOLD:
        this.displayingOrderStatus = OrderStatus.ON_HOLD;
        return 'warning';
      case OrderStatus.REFUNDED:
        this.displayingOrderStatus = OrderStatus.REFUNDED;
        return 'info';
      case OrderStatus.PAYMENT:
          this.displayingOrderStatus = OrderStatus.PAYMENT;
          return 'info';
      case OrderStatus.CANCELLED:
        this.displayingOrderStatus = OrderStatus.CANCELLED;
        return 'secondary';
      default:
        return 'info';
    }
  }

  getDisplayingOrderStatus(status: string) {
    return (OrderStatus as any)[status];
  }

  onSearch(value: string) {}

  onUpload(event: UploadEvent) {
    
  }

  onStatusChange(order: Order) {
    this.orderService.update(-1, order).subscribe(data => {
      console.log(data);
    })
    
  }

  onSelect(event: any) {
    this.imagePath =
      event.currentFiles[0].objectURL?.changingThisBreaksApplicationSecurity;
  }

  loadOrders(event: TableLazyLoadEvent) {
    this.currentTableLazyLoadEvent = event;

    let params = new HttpParams();
    params = params.append('pageSize', event?.rows ?? 15);
    params = params.append('page', (event?.first ?? 0) / (event?.rows ?? 15));
    if (event?.multiSortMeta) {
      let ascValues: string[] = [];
      let descValues: string[] = [];
      event?.multiSortMeta.forEach((field) => {
        if (field?.order === 1) {
          ascValues.push(field.field);
        } else if (field?.order === -1) {
          descValues.push(field?.field);
        }
      });
      if (ascValues.length > 0) {
        params = params.append('asc', ascValues.join(','));
      }
      if (descValues.length > 0) {
        params = params.append('desc', descValues.join(','));
      }
    }
    // this.orderService
    //   .findAllBy(params)
    //   .subscribe((data) => {
    //     this.orders = [...data.data];
    //     this.total = data.total;
    //   });

    this.orderService
      .getAll()
      .subscribe((data) => {
        // this.Orders = [...data.data];
        // this.total = data.total;
        this.orders = data;
        this.total = data.length;
      });
  }

}
