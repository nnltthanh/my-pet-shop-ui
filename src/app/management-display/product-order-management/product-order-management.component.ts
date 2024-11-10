import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UploadEvent } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../auth/user.model';
import { Order, OrderStatus, OrderStatusMeaning } from '../../product/order.model';
import { PetBreed } from '../../product/pet-category.model';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { ProductOrderDetailDialogComponent } from './product-order-detail-dialog/product-order-detail-dialog.component';
import { ProductOrderDetailReviewReplyComponent } from './product-order-detail-review-reply/product-order-detail-review-reply.component';
@Component({
  selector: 'app-product-order-management',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    TagModule,
    CurrencyPipe,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DecimalPipe,
  ],
  templateUrl: './product-order-management.component.html',
  styleUrl: './product-order-management.component.scss'
})
export class ProductOrderManagementComponent {

  readonly OrderStatusMeaning = OrderStatusMeaning;

  readonly OrderStatus = OrderStatus;

  readonly statuses = Object.values(OrderStatus);

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
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
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
    const modalRef = this.modalService.open(ProductOrderDetailDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
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

  cancelOrder(order: Order) {
    const modalRef = this.modalService.open(ProductOrderDetailReviewReplyComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
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
      case OrderStatus.PROCESSING:
        this.displayingOrderStatus = OrderStatus.PROCESSING;
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
