import { Component } from '@angular/core';
import { Address } from '../../../auth/address.model';
import { AddressService } from '../../../services/address.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressBookAddDialogComponent } from './address-book-add-dialog/address-book-add-dialog.component';
import { AddressSelectionComponent } from './address-selection/address-selection.component';
import { forkJoin } from 'rxjs';


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
    this.addressService.getAddressesByCustomerId(1).subscribe((addresses) => {

      this.addresses = addresses;
      this.addresses.reverse().forEach((address, index) => {

        forkJoin({
          getCity: this.addressService.getCityById(address.cityId),
          getDistrict: this.addressService.getDistrictById(address.cityId, address.districtId),
          getWard: this.addressService.getWardById(address.districtId, address.wardId)
        })
        .subscribe(({getCity, getDistrict, getWard}) => {
          let city = getCity.data.find(x => +x.ProvinceID === +address.cityId)?.NameExtension[1];
          let district = getDistrict.data.find(x => +x.DistrictID === +address.districtId)?.DistrictName;
          let ward = getWard.data.find(x => x.WardCode === address.wardId)?.NameExtension[0];

          address.displayingAddress =
          address.address +
          ', ' + ward +
          ', ' + district +
          ', ' + city;

        if (address.isDefault) {
          this.addresses.splice(index, 1);
          this.addresses.unshift(address);
        }
        });

      });
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
        this.getAddressesByCustomerId();
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
    this.addressService.updateAddress(1, address).subscribe(data => {
      this.getAddressesByCustomerId();
    })
  }

}
