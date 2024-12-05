import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, inject } from '@angular/core';
import { UploadEvent } from 'primeng/fileupload';
import { TableLazyLoadEvent } from 'primeng/table';

import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../../auth/user.model';
import { ServiceProduct, ServiceProductType } from '../../../product/service-product.model';
import { ServiceProductService } from '../../../services/service-product.service';
import { UserService } from '../../../services/user.service';
import { EnumValuePipe } from '../../../sharing/enum-value.pipe';
import { ServiceProductAddDialogComponent } from './service-product-add-dialog/service-product-add-dialog.component';
import { ServiceProductEditDialogComponent } from './service-product-edit-dialog/service-product-edit-dialog.component';
import { ToastMessageService } from '../../../sharing/toast-message/toast-message.service';

@Component({
  selector: 'app-service-product-list-display',
  standalone: true,
  imports: [
    TableModule,
    ConfirmDialogModule,
    InputNumberModule,
    FormsModule,
    TagModule,
    DialogModule,
    RatingModule,
    CurrencyPipe,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    NgIf,
    NgFor,
    EnumValuePipe
  ],
  templateUrl: './service-product-list-display.component.html',
  styleUrl: './service-product-list-display.component.scss'
})
export class ServiceProductListDisplayComponent implements AfterViewChecked {


  readonly ServiceProductType = ServiceProductType;

  total: number = 0;

  products: ServiceProduct[] = [];

  selectedProducts: ServiceProduct[] = [];

  submitted: boolean = false;

  currentTableLazyLoadEvent: TableLazyLoadEvent;

  userService = inject(UserService);

  serviceProductService = inject(ServiceProductService);

  modalService = inject(NgbModal);

  toastMessageService = inject(ToastMessageService);

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
 
  ngOnInit() {
    this.serviceProductService
      .findAll()
      .subscribe((data) => {
        // this.users = [...data.data];
        // this.total = data.total;
        this.products = [...data];
        this.total = data.length;
      });
  }

  openNew() {
    const modalRef = this.modalService.open(ServiceProductAddDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'xl'
    });
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadProducts(this.currentTableLazyLoadEvent);
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

  deleteSelectedUsers() {
   
  }

  edit(product: ServiceProduct) {
    const modalRef = this.modalService.open(ServiceProductEditDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'xl'
    });
    modalRef.componentInstance.productId = product.id;
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadProducts(this.currentTableLazyLoadEvent);
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

  onSearch(value: string) {}

  loadProducts(event: TableLazyLoadEvent) {
    this.currentTableLazyLoadEvent = event;

    this.serviceProductService
      .findAll()
      .subscribe((data) => {
        this.products = [...data];
        this.total = data.length;
        this.cdr.detectChanges();
      });
  }

  delete(product: ServiceProduct) {
    this.serviceProductService
    .delete(product.id)
    .subscribe((data) => {
      this.toastMessageService.addSuccessfulMessage("Xoá dịch vụ thành công");
     this.loadProducts(this.currentTableLazyLoadEvent);
    });
  }

}
