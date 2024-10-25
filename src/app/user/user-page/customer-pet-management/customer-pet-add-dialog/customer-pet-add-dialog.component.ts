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
import { Gender } from '../../../../gender.model';
import { HealthRecord } from '../../../../product/health-record.model';
import { PetBreed, PetCategory } from '../../../../product/pet-category.model';
import { PetCustomer } from '../../../../product/pet-customer.model';
import { PetCustomerService } from '../../../../services/pet-customer.service';
import { User } from '../../../../auth/user.model';
import { getLoggedInUserId } from '../../../../services/user.service';

@Component({
  selector: 'app-customer-pet-add-dialog',
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
  templateUrl: './customer-pet-add-dialog.component.html',
  styleUrl: './customer-pet-add-dialog.component.scss'
})
export class CustomerPetAddDialogComponent {

  activeModal: NgbActiveModal;

  petCustomerService = inject(PetCustomerService);

  readonly petBreed = PetBreed;

  readonly genders = Gender;

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

  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(undefined);
  }

  saveProduct() {
    if (this.petName.trim()) {
      let petCustomer: PetCustomer = new PetCustomer();
      petCustomer.name = this.petName;
      if (this.petPrice) {
        petCustomer.price = this.petPrice;
      }
      petCustomer.quantity = this.quantity;
      petCustomer.category = new PetCategory();
      if (this.selectedPetBreed) {
        petCustomer.category.breed = this.selectedPetBreed;
      }
      petCustomer.category.name = this.categoryName ?? null;
      petCustomer.description = this.petDescription;

      if (this.dob) {
        let currentDate = new Date();
        let dobCalculating: Date = new Date(this.dob);
        let age = this.monthDiff(dobCalculating, currentDate);
        this.latestHealthRecord!.age = age;
        petCustomer.dateOfBirth = this.formatDate(dobCalculating);
      }

      if (this.latestHealthRecord) {
        if ((this.latestHealthRecord.weight == 0 || this.latestHealthRecord.weight == null) &&
          (this.latestHealthRecord.petLength == 0 || this.latestHealthRecord.petLength == null) &&
          (this.latestHealthRecord.age == 0 || this.latestHealthRecord.age == null) &&
          (!this.latestHealthRecord.vaccination.trim())) {
          this.latestHealthRecord = null;
        }
      }

      petCustomer.latestHealthRecord = this.latestHealthRecord;
      if (petCustomer.latestHealthRecord) {
        petCustomer.healthRecord = [petCustomer.latestHealthRecord];
      }

      petCustomer.color = this.color ?? null;
      petCustomer.origin = this.origin ?? null;
      petCustomer.gender = this.gender ?? null;

      petCustomer.customer = new User({id: getLoggedInUserId()});

      this.petCustomerService.add(petCustomer, this.uploadFile).subscribe({
        next: (data) => {
          this.activeModal.close(data);
        },
      });
    }
  }

  onSelectImage(file: any | File) {
    this.uploadFile = file;
    this.imageSrc = file?.objectURL;
  }

  choose(event: any, callback: any) {
    callback();
  }

  monthDiff(dateFrom: Date, dateTo: Date) {
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
