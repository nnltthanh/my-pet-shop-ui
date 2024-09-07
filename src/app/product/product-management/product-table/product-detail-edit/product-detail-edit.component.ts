import { NgIf } from '@angular/common';
import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { PetBreed } from '../../../pet-category.model';
import { PetProduct } from '../../../pet-product.model';

@Component({
  selector: 'app-product-detail-edit',
  standalone: true,
  imports: [InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    FileUploadModule,
    TagModule,
    DropdownModule,ButtonModule, FormsModule, NgIf],
  templateUrl: './product-detail-edit.component.html',
  styleUrl: './product-detail-edit.component.scss'
})
export class ProductDetailEditComponent implements OnInit, OnChanges {
  
  readonly petBreed = PetBreed;
  
  product = input<PetProduct>();
  
  productDialog = input<boolean>(false);
  
  petProduct?: PetProduct;

  submitted: boolean = false;

  inventoryStatus: string = '';

  statuses: any[] = [];

  imageSrc?: string;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.petProduct = this.product();
      this.imageSrc = this.product()?.imageData.path;
    }
    if (changes['productDialog']) {
      console.log(this.productDialog());
      
    }
  }

  ngOnInit(): void {
      
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  openNew() {
    // this.product = null;
    this.submitted = false;
  }

  hideDialog() {
    this.submitted = false;
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

}
