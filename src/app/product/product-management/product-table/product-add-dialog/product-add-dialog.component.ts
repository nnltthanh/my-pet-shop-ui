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
import { PetBreed, PetCategory } from '../../../pet-category.model';
import { PetProduct } from '../../../pet-product.model';
import { MessageService } from 'primeng/api';
import { PetProductService } from '../../../../services/pet-product.service';
@Component({
  selector: 'app-product-add-dialog',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    FileUploadModule,
    TagModule,
    DropdownModule, ButtonModule, FormsModule, NgIf,
    FormsModule
  ],
  templateUrl: './product-add-dialog.component.html',
  styleUrl: './product-add-dialog.component.scss'
})
export class ProductAddDialogComponent {

  readonly petBreed = PetBreed;

  addProductDialog: ModelSignal<boolean> = model<boolean>(false);

  submitted = input<boolean>(false);

  submittedChanged = output<boolean>();

  inventoryStatus: string = '';

  statuses: any[] = [];

  imageSrc: string = '';

  uploadFile: File;

  petName: string = '';

  selectedPetBreed: PetBreed | undefined = undefined;

  petPrice: number | undefined = undefined;

  petDescription: string = '';

  loading = output<boolean>();

  constructor(private messageService: MessageService,
    private petProductService: PetProductService
  ) { }

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
    this.addProductDialog.set(false);
  }

  hideDialog() {
    console.log('sssss');

    this.submittedChanged.emit(false);
    this.addProductDialog.set(false);
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
    this.uploadFile = file;
    this.imageSrc = file?.objectURL;
  }

  saveProduct() {
    
    if (this.petName.trim()) {
      this.loading.emit(true);
      let petProduct: PetProduct = new PetProduct();
      petProduct.name = this.petName;
      if (this.petPrice) {
        petProduct.price = this.petPrice;
      }
      petProduct.description = this.petDescription;
      petProduct.category = new PetCategory();
      if (this.selectedPetBreed) {
        petProduct.category.breed = this.selectedPetBreed;
      }
      petProduct.category.name = "Mèo Sphynx";
      console.log(petProduct);
      
      this.petProductService.add(petProduct, this.uploadFile).subscribe(
        {
          complete: () => {
            this.submittedChanged.emit(true);
            this.addProductDialog.set(false);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            this.loading.emit(false);
          },
        }
      );

    }
  }

}
