import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetCustomer } from '../../../product/pet-customer.model';
import { PetCustomerService } from '../../../services/pet-customer.service';
import { getLoggedInUserId } from '../../../services/user.service';
import { CustomerPetCardComponent } from './customer-pet-card/customer-pet-card.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerPetAddDialogComponent } from './customer-pet-add-dialog/customer-pet-add-dialog.component';

@Component({
  selector: 'app-customer-pet-management',
  standalone: true,
  imports: [AsyncPipe, CustomerPetCardComponent],
  templateUrl: './customer-pet-management.component.html',
  styleUrl: './customer-pet-management.component.scss'
})
export class CustomerPetManagementComponent implements OnInit {

  modalService = inject(NgbModal);

  petCustomerService = inject(PetCustomerService);

  $petCustomers: Observable<PetCustomer[]>;

  ngOnInit(): void {
    this.$petCustomers = this.petCustomerService.findAllByCustomer(getLoggedInUserId());
  }

  openAddDialog() {
    const modalRef = this.modalService.open(CustomerPetAddDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'xl'
    });
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.$petCustomers = this.petCustomerService.findAllByCustomer(getLoggedInUserId());
        }
      },
      (reason) => {
        if (
          reason == ModalDismissReasons.BACKDROP_CLICK ||
          reason == ModalDismissReasons.ESC
        ) {
        }
      })
  }

}
