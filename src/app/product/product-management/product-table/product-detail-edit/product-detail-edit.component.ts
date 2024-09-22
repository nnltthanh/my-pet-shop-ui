import { NgIf } from '@angular/common';
import { Component, input, model, ModelSignal, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { PetProductService } from '../../../../services/pet-product.service';

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
    DropdownModule,ButtonModule, FormsModule, NgIf,
    FormsModule
  ],
  templateUrl: './product-detail-edit.component.html',
  styleUrl: './product-detail-edit.component.scss'
})
export class ProductDetailEditComponent implements OnInit, OnChanges {

  readonly petBreed = PetBreed;
  
  product = input<PetProduct>(new PetProduct());
  
  productDialog: ModelSignal<boolean> = model<boolean>(false);
  
  petProduct?: PetProduct;

  submitted = input<boolean>(false);

  submittedChanged = output<boolean>();

  inventoryStatus: string = '';

  statuses: any[] = [];

  imageSrc?: string;

  updatedFile: File;

  loading = output<boolean>();

  constructor(private messageService: MessageService,
      private petProductService: PetProductService
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.petProduct = this.product();
      this.imageSrc = this.product()?.imageData.imageUrls;
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
    this.submittedChanged.emit(false);
    this.productDialog.set(false);
  }

  hideDialog() {
    console.log('sssss');
    this.submittedChanged.emit(false);
    this.productDialog.set(false);
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

  onSelectImage(file: any | File) {
    this.updatedFile = file;
    this.imageSrc = file?.objectURL;
  }

  saveProduct() {
    if (this.product.name?.trim()) {
        if (this.product().id) {
          this.loading.emit(true);
            this.petProductService.update(this.product().id, this.product(), this.updatedFile).subscribe(
              {
                complete: () => {
                  this.submittedChanged.emit(true);
                  this.productDialog.set(false);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                  this.loading.emit(false);
                },
              }
            );
        } else {
            // this.product().id = this.createId();
            // this.product().image = 'product-placeholder.svg';
            // this.product()s.push(this.product());
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        // this.product()s = [...this.product()s];
  }
}

}
