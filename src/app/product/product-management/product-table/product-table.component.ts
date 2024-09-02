import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { finalize, take } from 'rxjs';
import { PetProductService } from '../../../services/pet-product.service';
import { ProductService } from '../../../services/product.service';
import { PetBreed } from '../../pet-category.model';
import { PetProduct } from '../../pet-product.model';
import { Product } from '../../product.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-table',
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
    InputTextareaModule,
    NgIf,
    NgFor,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent implements OnInit {
  readonly petBreed = PetBreed;

  productDialog: boolean = false;

  total: number = 0;

  products!: PetProduct[];

  product!: PetProduct;

  selectedProducts!: PetProduct[] | null;

  submitted: boolean = false;

  statuses!: any[];

  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private petProductService: PetProductService // , private messageService: MessageService, private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // this.petProductService
    //     .findAll().pipe(take(1))
    //     .subscribe((data) => {
    //       this.products = data.data;
    //       this.total = data.total;
    //       this.loading = false;
    //     });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  openNew() {
    // this.product = null;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected products?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
    //         this.selectedProducts = null;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     }
    // });
  }

  editProduct(product: PetProduct) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete ' + product.name + '?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => val.id !== product.id);
    //         this.product = {};
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //     }
    // });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.product.name?.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     } else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.products.length; i++) {
    //     if (this.products[i].id === id) {
    //         index = i;
    //         break;
    //     }
    // }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  onSearch(value: string) {}

  loadPetProducts(event: TableLazyLoadEvent) {
    this.loading = true;

    let params = new HttpParams();
    params = params.append('pageSize', event.rows ?? 20);
    params = params.append('page', (event.first ?? 0) / (event.rows ?? 20));
    if (event.sortField) {
      if (event.sortOrder === 1) {
        params = params.append('asc', event.sortField.toString());
      } else if (event.sortOrder === -1) {
        params = params.append('desc', event.sortField.toString());
      }
    }

    this.petProductService
      .findAllBy(params)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.products = data.data;
        this.total = data.total;
      });
  }
}
