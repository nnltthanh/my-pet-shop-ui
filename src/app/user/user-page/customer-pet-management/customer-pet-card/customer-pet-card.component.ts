import { DatePipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PetCustomer } from '../../../../product/pet-customer.model';
import { CustomerPetDetailDialogComponent } from './customer-pet-detail-dialog/customer-pet-detail-dialog.component';

@Component({
  selector: 'app-customer-pet-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-pet-card.component.html',
  styleUrl: './customer-pet-card.component.scss'
})
export class CustomerPetCardComponent {

  modalService = inject(NgbModal);

  pet = input.required<PetCustomer>();

  petValue: PetCustomer;

  isShowDialog: boolean = false;

  constructor() {
    effect(() => {
      if (this.pet()) {
        this.petValue = this.pet();
      }
    })
  }

  public getImage(pet: PetCustomer): string {
    return pet.imageData?.imageUrls;
  }
  
  openDetailDialog() {
    this.isShowDialog = true;
    const modalRef = this.modalService.open(CustomerPetDetailDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'xl'
    });
    modalRef.componentInstance.petCustomerId = this.petValue.id;
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.petValue = result;
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

