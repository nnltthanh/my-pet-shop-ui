import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileSelectEvent, FileUploadEvent, FileUploadModule, UploadEvent } from 'primeng/fileupload';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { ProductDetailEditComponent } from './product-detail-edit/product-detail-edit.component';

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
    NgIf,
    NgFor,
    ProductDetailEditComponent
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

  loading: boolean = false;

  inventoryStatus: string = '';

  imagePath: any;

  constructor(
    private productService: ProductService,
    private petProductService: PetProductService, private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    // this.petProductService
    //     .findAll().pipe(take(1))
    //     .subscribe((data) => {
    //       this.products = data.data;
    //       this.total = data.total;
    //       this.loading = false;
    //     });

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

  onSearch(value: string) { }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  onSelect(event: any) {
    this.imagePath = event.currentFiles[0].objectURL?.changingThisBreaksApplicationSecurity;
    console.log(event);

  }

  loadPetProducts(event: TableLazyLoadEvent) {
    this.loading = true;

    let params = new HttpParams();
    params = params.append('pageSize', event.rows ?? 15);
    params = params.append('page', (event.first ?? 0) / (event.rows ?? 15));
    if (event.multiSortMeta) {
      let ascValues: string[] = [];
      let descValues: string[] = [];
      event.multiSortMeta.forEach(field => {
        if (field.order === 1) {
          ascValues.push(field.field);
        }
        else if (field.order === -1) {
          descValues.push(field.field);
        }
      })
      if (ascValues.length > 0) {
        params = params.append('asc', ascValues.join(','));
      }
      if (descValues.length > 0) {
        params = params.append('desc', descValues.join(','));
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
