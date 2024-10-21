import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressSelectionComponent } from '../address-selection/address-selection.component';
import { AddressService } from '../../../../services/address.service';
import { Address } from '../../../../auth/address.model';
import { User } from '../../../../auth/user.model';

@Component({
  selector: 'app-address-book-add-dialog',
  standalone: true,
  imports: [FormsModule, AddressSelectionComponent],
  templateUrl: './address-book-add-dialog.component.html',
  styleUrl: './address-book-add-dialog.component.scss'
})
export class AddressBookAddDialogComponent {

  activeModal!: NgbActiveModal;

  customerName: string;

  customerPhone: string;

  address: Address | null = null;

  constructor(private addressService: AddressService) {}

  closeDialog() {
    this.activeModal.close(true);
  }

  dismissDialog() {
    this.activeModal.dismiss(false);
  }

  onAddressChanged(address: Address) {
    this.address = address;
    this.address.customer = new User({id: 1});
    this.address.belongsTo = this.customerName;
    this.address.phone = this.customerPhone;
    this.address.isDefault = false;
    this.address.displayingAddress = address.displayingAddress;
  }

  saveAddress() {
    if (this.address) {
      this.addressService.postAddress(this.address).subscribe(data => {
        this.closeDialog();
      })
    }
  }

}
