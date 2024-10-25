import { AsyncPipe, NgIf } from '@angular/common';
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
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { map, Observable } from 'rxjs';
import { PetCustomer } from '../../../../../product/pet-customer.model';
import { PetCustomerService } from '../../../../../services/pet-customer.service';
import { PetBreed } from '../../../../../product/pet-category.model';
import { Gender } from '../../../../../gender.model';
import { HealthRecord } from '../../../../../product/health-record.model';

@Component({
  selector: 'app-customer-pet-detail-dialog',
  standalone: true,
  imports: [AsyncPipe,
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
  templateUrl: './customer-pet-detail-dialog.component.html',
  styleUrl: './customer-pet-detail-dialog.component.scss'
})
export class CustomerPetDetailDialogComponent implements OnInit {

  activeModal: NgbActiveModal;

  petCustomerService = inject(PetCustomerService);

  petCustomerId: number;

  petCustomer: PetCustomer;

  isLoading: Observable<PetCustomer>;

  readonly petBreed = PetBreed;

  readonly genders = Gender;

  inventoryStatus: string = '';

  statuses: any[] = [];

  gender: Gender;

  availableGenders: Gender[] = [];

  imageSrc?: string;

  updatedFile: File;

  defaultDob: Date;

  ngOnInit(): void {
    this.isLoading = this.petCustomerService.findById(this.petCustomerId).pipe(
      map((petCustomer) => {
        this.petCustomer = petCustomer;
        if (this.petCustomer.dateOfBirth) {
          this.petCustomer.dateOfBirth = new Date(this.petCustomer.dateOfBirth);
        }
        this.petCustomer.latestHealthRecord = this.petCustomer.latestHealthRecord ?? new HealthRecord();
        this.imageSrc = this.petCustomer.imageData?.imageUrls;
        return petCustomer;
      })
    )
  }
  
  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(undefined);
  }

  onSelectImage(file: any | File) {
    this.updatedFile = file;
    this.imageSrc = file?.objectURL;
  }

  choose(event: any, callback: any) {
    callback();
  }

  update() {
    if (this.petCustomer.dateOfBirth) {
      let currentDate = new Date();
      let dob: Date = new Date(this.petCustomer.dateOfBirth);
      let age = this.monthDiff(dob, currentDate);
      this.petCustomer.latestHealthRecord!.age = age;
      this.petCustomer.dateOfBirth = this.formatDate(dob);
    }
    if (this.petCustomer.latestHealthRecord) {
      let latestHealthRecord = this.petCustomer.latestHealthRecord;
      if ((latestHealthRecord.weight == 0 || latestHealthRecord.weight == null) &&
      (latestHealthRecord.petLength == 0 || latestHealthRecord.petLength == null) &&
      (latestHealthRecord.age == 0 || latestHealthRecord.age == null) &&
      (!latestHealthRecord.vaccination?.trim())) {
        this.petCustomer.latestHealthRecord = null;
      }
    }
    this.petCustomerService.update(this.petCustomerId, this.petCustomer, this.updatedFile).subscribe({
      next: (data) => {
        this.activeModal.close(data);
      }
    })
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
