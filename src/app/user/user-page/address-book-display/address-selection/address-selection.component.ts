import { Component, output } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddressService } from '../../../../services/address.service';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import {
  DistrictGHN,
  ProvinceGHN,
  WardGHN,
} from '../../../../auth/province.model';
import { Address } from '../../../../auth/address.model';

@Component({
  selector: 'app-address-selection',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './address-selection.component.html',
  styleUrl: './address-selection.component.scss',
})
export class AddressSelectionComponent {

  cities: ProvinceGHN[] = [];

  selectedCity: ProvinceGHN;

  isCityDropdownLoading: boolean = true;

  districts: DistrictGHN[] = [];

  selectedDistrict: DistrictGHN;

  isDistrictDropdownLoading: boolean = false;

  wards: WardGHN[] = [];

  selectedWard: WardGHN;

  isWardDropdownLoading: boolean = false;

  numberAddress: string;

  addressChanged = output<Address>();

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService
      .getCity()
      .pipe(finalize(() => (this.isCityDropdownLoading = false)))
      .subscribe((response) => {
        response.data.forEach((city: ProvinceGHN) => {
          city.selectedNameExtension = city.NameExtension[1];
          this.cities.push(city);
        });
        this.cities = [...this.cities];
      });
  }

  onCityChanged() {
    this.selectedDistrict = new DistrictGHN();
    this.selectedWard = new WardGHN();
  }

  onClickToSelectDistrict() {
    this.isDistrictDropdownLoading = true;

    this.selectedDistrict = new DistrictGHN();
    this.selectedWard = new WardGHN();
    
    this.districts = [];
    this.wards = [];

    this.addressService
      .getDistrict(this.selectedCity.ProvinceID.toString())
      .pipe(finalize(() => (this.isDistrictDropdownLoading = false)))
      .subscribe((response) => {
        response.data.forEach((district: DistrictGHN) => {
          district.selectedNameExtension = district.DistrictName;
          this.districts.push(district);
        });
        this.districts = [...this.districts];
      });
  }

  onClickToSelectWard() {
    this.selectedWard = new WardGHN();
    this.wards = [];

    if (this.selectedDistrict && this.selectedDistrict.DistrictID) {
      this.isWardDropdownLoading = true;
      this.addressService
        .getWard(this.selectedDistrict.DistrictID.toString())
        .pipe(finalize(() => (this.isWardDropdownLoading = false)))
        .subscribe((response) => {
            response.data.forEach((ward: WardGHN) => {
            ward.selectedNameExtension = ward.NameExtension[0];

            this.wards.push(ward);
          });
          this.wards = [...this.wards];
        });
    }
  }

  onAddressChanged() {
    let address: Address = new Address();

    if (this.selectedCity.selectedNameExtension && this.selectedDistrict.selectedNameExtension && this.selectedWard.selectedNameExtension) {
      address.cityId = this.selectedCity.ProvinceID;
      address.districtId = this.selectedDistrict.DistrictID;
      address.wardId = this.selectedWard.WardCode;
      address.address = this.numberAddress;
      
      this.addressChanged.emit(address);
    }

  }
}
