import { NgIf } from '@angular/common';
import {
  Component,
  input,
  model,
  ModelSignal,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';
import { Gender } from '../../../../gender.model';
import { PetProductService } from '../../../../services/pet-product.service';
import { PetBreed } from '../../../pet-category.model';
import { PetProduct } from '../../../pet-product.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HealthRecord } from '../../../health-record.model';

@Component({
  selector: 'app-product-detail-edit',
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
  templateUrl: './product-detail-edit.component.html',
  styleUrl: './product-detail-edit.component.scss',
})
export class ProductDetailEditComponent implements OnInit, OnChanges {
  readonly petBreed = PetBreed;

  readonly genders = Gender;

  selectedFontStyle: string;

  product = input<PetProduct>(new PetProduct());

  productDialog: ModelSignal<boolean> = model<boolean>(false);

  petProduct?: PetProduct;

  submitted = input<boolean>(false);

  submittedChanged = output<boolean>();

  inventoryStatus: string = '';

  statuses: any[] = [];

  gender: Gender;

  availableGenders: Gender[] = [];

  imageSrc?: string;

  updatedFile: File;

  loading = output<boolean>();

  defaultDob: Date;

  constructor(
    private messageService: MessageService,
    private petProductService: PetProductService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.petProduct = this.product();
      if (this.petProduct.dateOfBirth) {
        this.petProduct.dateOfBirth = new Date(this.petProduct.dateOfBirth);
      }
      if (!this.petProduct.latestHealthRecord) {
        this.petProduct.latestHealthRecord = new HealthRecord();
      }
      this.imageSrc = this.petProduct?.imageData?.imageUrls;
    }
  }

  ngOnInit(): void {
    this.availableGenders = [Gender.FEMALE, Gender.MALE, Gender.OTHER];
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
    if (this.petProduct) {
        this.loading.emit(true);
        if (this.petProduct.dateOfBirth) {
          let currentDate = new Date();
          let dob: Date = new Date(this.petProduct.dateOfBirth);
          let age = this.monthDiff(dob, currentDate);
          this.petProduct.latestHealthRecord!.age = age;
          this.petProduct.dateOfBirth = this.formatDate(dob);
        }
        if (this.petProduct.latestHealthRecord) {
          let latestHealthRecord = this.petProduct.latestHealthRecord;
          if ((latestHealthRecord.weight == 0 || latestHealthRecord.weight == null) &&
          (latestHealthRecord.petLength == 0 || latestHealthRecord.petLength == null) &&
          (latestHealthRecord.age == 0 || latestHealthRecord.age == null) &&
          (!latestHealthRecord.vaccination.trim())) {
            this.petProduct.latestHealthRecord = null;
          }
        }
        
        this.petProductService
          .update(this.petProduct.id, this.petProduct, this.updatedFile)
          .pipe(finalize(() => this.loading.emit(false)))
          .subscribe({
            complete: () => {
              this.submittedChanged.emit(true);
              this.productDialog.set(false);
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Updated',
                life: 3000,
              });
            },
          });
      } else {
        // this.product().id = this.createId();
        // this.product().image = 'product-placeholder.svg';
        // this.product()s.push(this.product());
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      // this.product()s = [...this.product()s];
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
