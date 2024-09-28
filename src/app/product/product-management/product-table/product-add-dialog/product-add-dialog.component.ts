import { NgIf } from '@angular/common';
import {
  Component,
  input,
  model,
  ModelSignal,
  output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MessageService } from 'primeng/api';
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
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { Gender } from '../../../../gender.model';
import { PetProductService } from '../../../../services/pet-product.service';
import { PetBreed, PetCategory } from '../../../pet-category.model';
import { PetProduct } from '../../../pet-product.model';
import { HealthRecord } from '../../../health-record.model';

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
    DropdownModule,
    ButtonModule,
    FormsModule,
    NgIf,
    FormsModule,
    EditorModule,
    CalendarModule,
    MatExpansionModule,
    PanelModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './product-add-dialog.component.html',
  styleUrl: './product-add-dialog.component.scss',
})
export class ProductAddDialogComponent {
  readonly petBreed = PetBreed;

  readonly genders = Gender;

  addProductDialog: ModelSignal<boolean> = model<boolean>(false);

  submitted = input<boolean>(false);

  submittedChanged = output<boolean>();

  inventoryStatus: string = '';

  statuses: any[] = [];

  imageSrc: string = '';

  uploadFile: File;

  petName: string = '';

  selectedPetBreed: PetBreed | undefined = undefined;

  categoryName: string = '';

  petPrice: number | undefined = undefined;

  quantity: number = 1;

  gender: Gender;

  color: string = '';

  dob: Date;

  weight: number;

  petLength: number;

  vaccination: string = '';

  origin: string = '';

  petDescription: string = '';

  latestHealthRecord: HealthRecord | null = new HealthRecord();

  loading = output<boolean>();

  constructor(
    private messageService: MessageService,
    private petProductService: PetProductService
  ) {}

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
      petProduct.quantity = this.quantity;
      petProduct.category = new PetCategory();
      if (this.selectedPetBreed) {
        petProduct.category.breed = this.selectedPetBreed;
      }
      petProduct.category.name = this.categoryName ?? null;
      petProduct.description = this.petDescription;

      if (this.dob) {
        let currentDate = new Date();
        let dobCalculating: Date = new Date(this.dob);
        let age = this.monthDiff(dobCalculating, currentDate);
        this.latestHealthRecord!.age = age;
        petProduct.dateOfBirth = this.formatDate(dobCalculating);
      }

      if (this.latestHealthRecord) {
        if ((this.latestHealthRecord.weight == 0 || this.latestHealthRecord.weight == null) &&
        (this.latestHealthRecord.petLength == 0 || this.latestHealthRecord.petLength == null) &&
        (this.latestHealthRecord.age == 0 || this.latestHealthRecord.age == null) &&
        (!this.latestHealthRecord.vaccination.trim())) {
          this.latestHealthRecord = null;
        }
      }

      petProduct.latestHealthRecord = this.latestHealthRecord;
      if (petProduct.latestHealthRecord) {
        petProduct.healthRecord = [petProduct.latestHealthRecord];
      }

      petProduct.color = this.color ?? null;
      petProduct.origin = this.origin ?? null;
      petProduct.gender = this.gender ?? null;

      this.petProductService.add(petProduct, this.uploadFile).subscribe({
        error: (error) => {
          console.log(error);
          this.loading.emit(false);
        },
        complete: () => {
          this.submittedChanged.emit(true);
          this.addProductDialog.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Updated',
            life: 3000,
          });
          this.loading.emit(false);
        },
      });
    }
  }

  choose(event: any, callback: any) {
    callback();
  }

  monthDiff(dateFrom:Date, dateTo:Date) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }

  formatDate(date: Date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // padStart ensures two digits for month
      const day = date.getDate().toString().padStart(2, '0'); // padStart ensures two digits for day

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
  }

}
