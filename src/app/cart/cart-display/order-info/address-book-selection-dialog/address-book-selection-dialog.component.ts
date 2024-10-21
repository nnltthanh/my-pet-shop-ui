import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { Address } from '../../../../auth/address.model';
import { AddressService } from '../../../../services/address.service';
import { getLoggedInUserId } from '../../../../services/user.service';

@Component({
  selector: 'app-address-book-selection-dialog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './address-book-selection-dialog.component.html',
  styleUrl: './address-book-selection-dialog.component.scss'
})
export class AddressBookSelectionDialogComponent implements OnInit {

  activeModal!: NgbActiveModal;

  customerName: string;

  customerPhone: string;

  addressService = inject(AddressService);

  $addresses: Observable<Address[]>;

  selectedAddress: Address;

  ngOnInit(): void {
    this.$addresses = this.addressService.getAddressesByCustomerId(getLoggedInUserId())
      .pipe(map(addresses => {

        if (!addresses || addresses.length === 0) {
          return [];
        }

        addresses = addresses.reverse();

        let index = addresses.findIndex(item => item.isDefault);
        if (index !== -1) {
          let address = addresses[index];
          addresses.splice(index, 1);
          addresses.unshift(address);
        }
        return addresses;
      }));
  }

  closeDialog() {
    this.activeModal.close(this.selectedAddress);
  }

  dismissDialog() {
    this.activeModal.dismiss(undefined);
  }

  onSelected(event: Address) {
    this.selectedAddress = event;
  }

}
