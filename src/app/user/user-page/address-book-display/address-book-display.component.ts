import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../../../auth/address.model';
import { AddressService } from '../../../services/address.service';
import { AddressBookAddDialogComponent } from './address-book-add-dialog/address-book-add-dialog.component';
import { AddressSelectionComponent } from './address-selection/address-selection.component';
import { getLoggedInUserId } from '../../../services/user.service';


@Component({
  selector: 'app-address-book-display',
  standalone: true,
  imports: [AddressSelectionComponent],
  templateUrl: './address-book-display.component.html',
  styleUrl: './address-book-display.component.scss',
})
export class AddressBookDisplayComponent {
  address: Address;

  updatingAddress: Address;

  addresses: Address[] = [];

  isLoading: boolean = false;


  constructor(private addressService: AddressService,
    private modalService: NgbModal
    ) {}


  ngOnInit(): void {
    this.getAddressesByCustomerId();
  }

  deleteAddress(address: Address) {
    this.isLoading = true;

    this.addressService.deleteAddress(address.id);

    this.getAddressesByCustomerId();
  }

  getAddressesByCustomerId() {
    this.addressService.getAddressesByCustomerId(getLoggedInUserId()).subscribe((addresses) => {

      this.addresses = addresses;
      
      if (!addresses || addresses.length === 0) {
        this.addresses = [];
        return;
      }

      addresses = addresses.reverse();

      let index = addresses.findIndex(item => item.isDefault);
      if (index !== -1) {
        let address = addresses[index];
        addresses.splice(index, 1);
        addresses.unshift(address);
      }

      this.addresses = [...addresses];

    });
  }

  openAddDialog() {
    const modalRef = this.modalService.open(AddressBookAddDialogComponent, {
      size: 'lg', 
      backdrop: 'static',
      centered: true
    });

    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        console.log(result);
        if (result.true) {
          this.getAddressesByCustomerId();
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

  setAddressToDefault(address: Address) {
    address.isDefault = true;
    this.addressService.updateAddress(getLoggedInUserId(), address).subscribe(data => {
      this.getAddressesByCustomerId();
    })
  }

}
