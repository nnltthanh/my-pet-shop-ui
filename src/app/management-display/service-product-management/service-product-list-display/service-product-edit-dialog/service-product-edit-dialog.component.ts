import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Gender } from '../../../../gender.model';
import { PetBreed } from '../../../../product/pet-category.model';
import {
  PetServiceVariant,
  PetServiceVariantName
} from '../../../../product/pet-service-variant.model';
import { ProductDetail } from '../../../../product/product-detail.model';
import { ServiceProduct, ServiceProductType } from '../../../../product/service-product.model';
import { ServiceProductService } from '../../../../services/service-product.service';
import { getEnumName } from '../../../../product/enum-name-getter';

@Component({
  selector: 'app-service-product-edit-dialog',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    FileUploadModule,
    TagModule,
    ButtonModule,
    FormsModule,
    NgIf,
    FormsModule,
    EditorModule,
    CalendarModule,
    MatExpansionModule,
    PanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    CurrencyPipe,
  ],
  templateUrl: './service-product-edit-dialog.component.html',
  styleUrl: './service-product-edit-dialog.component.scss'
})
export class ServiceProductEditDialogComponent implements OnInit {

  activeModal: NgbActiveModal;

  productId: number;

  readonly genders = Gender;

  imageSrc: string = '';

  uploadFile: File;

  description: string;

  price: number;

  availablePets = [PetBreed.CAT, PetBreed.DOG, PetBreed.HAMSTER];

  selectedPets: PetBreed;

  productDetails: ProductDetail[] = [];

  serviceProduct: ServiceProduct;

  availableVariants = [
    PetServiceVariantName.COLOR,
    PetServiceVariantName.SIZE,
    PetServiceVariantName.TIME,
    PetServiceVariantName.WEIGHT,
    PetServiceVariantName.FURRY_LENGTH,
    PetServiceVariantName.OTHER,
  ];

  availableServices = [
    ServiceProductType.SPA_GROOMING,
    ServiceProductType.PET_HOTEL,
    ServiceProductType.HOSPITAL,
    ServiceProductType.OTHER,
  ];

  selectedService: ServiceProductType;

  selectedVariant: PetServiceVariantName;

  variants: PetServiceVariant[] = [new PetServiceVariant()];

  serviceProductService = inject(ServiceProductService);

  ngOnInit(): void {
      this.serviceProductService.findById(this.productId)
      .subscribe({
        next: data => {
          this.serviceProduct = data;
          this.serviceProduct.type = (ServiceProductType as any)[this.serviceProduct.type];
          this.productDetails = data.productDetails;
          this.productDetails.forEach(detail => {
            if (detail.petServiceVariant) {
              // detail.petServiceVariant.suitableFor = (PetBreed as any)[detail.petServiceVariant.suitableFor];
              detail.petServiceVariant.variantName = (PetServiceVariantName as any)[detail.petServiceVariant.variantName];
            }
          })

          this.imageSrc = data?.imageData?.imageUrls;
        }
      })
  }


  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(undefined);
  }

  save() {
    this.serviceProductService.update(this.serviceProduct, this.productDetails, this.uploadFile).subscribe(data => {
      this.activeModal.close(data);
    })
  }

  buildServiceProduct(): ServiceProduct {
    let service = new ServiceProduct();
    // service.name = this.name;
    service.price = this.price;
    service.description = this.description;
    service.type = getEnumName(this.selectedService, ServiceProductType);
    return service;
  }

  buildProductDetails(): ProductDetail[] {
    let productDetails: ProductDetail[] = [];
    this.variants.forEach(variant => {
      let detail = new ProductDetail();
      detail.price = variant.addPrice + this.price;
      let petVariant = variant;
      // petVariant.suitableFor = getEnumName(variant.suitableFor, PetBreed);
      petVariant.variantName = getEnumName(variant.variantName, PetServiceVariantName);
      detail.petServiceVariant = petVariant;
      productDetails.push(detail);
    })
    return productDetails;
  }

  onSelectImage(file: any | File) {
    this.uploadFile = file;
    this.imageSrc = file?.objectURL;
  }

  choose(event: any, callback: any) {
    callback();
  }

  addRow() {
    this.variants.push(new PetServiceVariant());
    this.variants = [...this.variants];
  }

  deleteVariant(index: number) {
    this.variants.splice(index, 1);
    this.variants = [...this.variants];
  }

}
