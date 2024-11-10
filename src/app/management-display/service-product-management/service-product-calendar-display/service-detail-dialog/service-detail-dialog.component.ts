import { Component, inject, OnInit } from '@angular/core';
import { PetCustomerServiceProduct } from '../../../../product/pet-customer-service-product.model';
import { PetCustomerRegistrationService } from '../../../../services/pet-customer-registration.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EnumValuePipe } from '../../../../sharing/enum-value.pipe';
import { PetBreed } from '../../../../product/pet-category.model';
import { PetServiceVariantName } from '../../../../product/pet-service-variant.model';

@Component({
  selector: 'app-service-detail-dialog',
  standalone: true,
  imports: [DatePipe, EnumValuePipe, CurrencyPipe ],
  templateUrl: './service-detail-dialog.component.html',
  styleUrl: './service-detail-dialog.component.scss'
})
export class ServiceDetailDialogComponent implements OnInit {

  readonly PetServiceVariantName = PetServiceVariantName;

  readonly PetBreed = PetBreed;

  service: PetCustomerServiceProduct;

  activeModal: NgbActiveModal;

  petServiceRegistration = inject(PetCustomerRegistrationService);

  ngOnInit(): void {
    
  }

  dismissDialog() {
    this.activeModal.close();
  }

}
