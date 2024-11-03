import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PetCustomerServiceProduct } from '../../../product/pet-customer-service-product.model';
import { PetCustomerRegistrationService } from '../../../services/pet-customer-registration.service';
import { getLoggedInUserId } from '../../../services/user.service';
import { CustomerPetCardComponent } from '../customer-pet-management/customer-pet-card/customer-pet-card.component';
import { CustomerServiceCardComponent } from './customer-service-card/customer-service-card.component';

@Component({
  selector: 'app-customer-services-management',
  standalone: true,
  imports: [CustomerPetCardComponent, AsyncPipe, CustomerServiceCardComponent],
  templateUrl: './customer-services-management.component.html',
  styleUrl: './customer-services-management.component.scss'
})
export class CustomerServicesManagementComponent {

  modalService = inject(NgbModal);

  petRegistrationService = inject(PetCustomerRegistrationService);

  $petServices: Observable<PetCustomerServiceProduct[]>;

  ngOnInit(): void {
    this.$petServices = this.petRegistrationService.findAllByCustomer(getLoggedInUserId());
  }

}