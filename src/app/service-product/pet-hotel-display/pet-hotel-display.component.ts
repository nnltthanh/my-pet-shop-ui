import { AsyncPipe } from '@angular/common';
import { Component, inject, LOCALE_ID, ViewChild } from '@angular/core';
import { ServiceProductService } from '../../services/service-product.service';
import { ServiceProduct, ServiceProductType } from '../../product/service-product.model';
import { map, Observable } from 'rxjs';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PetCustomerService } from '../../services/pet-customer.service';
import { getLoggedInUserId } from '../../services/user.service';
import { PetCustomer } from '../../product/pet-customer.model';
import { ProductDetail } from '../../product/product-detail.model';
import { PetServiceVariantName } from '../../product/pet-service-variant.model';
import { NgbDateParserFormatter, NgbDatepicker, NgbDatepickerModule, NgbDateStruct, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { PetCustomerServiceProduct } from '../../product/pet-customer-service-product.model';
import { formatToLocalDateTime } from '../../sharing/format-datetime.const';
import { PetCustomerRegistrationService } from '../../services/pet-customer-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-hotel-display',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FormsModule, NgSelectModule, CalendarModule, NgbTimepickerModule, NgbTimepicker, NgbDatepicker, NgbDatepickerModule],
  templateUrl: './pet-hotel-display.component.html',
  styleUrl: './pet-hotel-display.component.scss',
  providers: [NgbTimepickerConfig],
})
export class PetHotelDisplayComponent {

  readonly PetServiceVariantName = PetServiceVariantName;

  serviceProductService = inject(ServiceProductService);

  products: ServiceProduct[]  = [];

  $isLoaded: Observable<ServiceProduct[]>;

  isRegistering: boolean = false;

  selectedProduct: ServiceProduct;

  @ViewChild('customerInfoForm') customerInfoForm: NgForm;

  petCustomerService = inject(PetCustomerService);

  petRegistration = inject(PetCustomerRegistrationService);

  myPets: PetCustomer[] = [];

  selectedPet: PetCustomer;

  productDetails: ProductDetail[] = [];

  selectedProductDetails: ProductDetail[] = [];

  selectedWeight: ProductDetail;

  selectedTime: ProductDetail;

  fromTime: Partial<NgbTimeStruct>;

  fromDate: NgbDateStruct;

  toTime: Partial<NgbTimeStruct>;

  toDate: NgbDateStruct;

  customerNote: string;

  router = inject(Router);

	constructor(config: NgbTimepickerConfig) {
		// customize default values of ratings used by this component tree
		config.seconds = false;
		config.spinners = false;
	}

  ngOnInit(): void {
    this.petCustomerService.findAllByCustomer(getLoggedInUserId()).subscribe({
      next: data => {
        this.myPets = [...data];
      }
    });
    this.$isLoaded = this.serviceProductService.findAllByType(ServiceProductType.PET_HOTEL).pipe(
      map((data) => {
        this.products = [... data];
        return data;
      })
    )
  }

  onSelect(product: ServiceProduct) {
    this.productDetails = [];
    this.selectedProductDetails = [];
    this.serviceProductService.findById(product.id).subscribe({
      next: data => {
        this.productDetails = [...data.productDetails];
      }
    })
  }

  filterByVariant(variantName: PetServiceVariantName) {
    if (this.productDetails && this.productDetails.length > 0) {
      return this.productDetails.filter(pd => {
        return pd.petServiceVariant &&  (PetServiceVariantName as any)[pd.petServiceVariant.variantName] === variantName;
      });
    }
    return [];
  }

  reserve() {
    console.log(this.selectedPet, this.selectedProduct, this.selectedProductDetails);
    console.log(this.fromTime, this.toTime, this.fromDate, this.toDate);
    let registration: PetCustomerServiceProduct = new PetCustomerServiceProduct();
    registration.serveFor = this.selectedPet;
    registration.serviceProduct = this.selectedProduct;
    registration.customerNote = this.customerNote;
    registration.serveFrom = formatToLocalDateTime(this.fromDate, this.fromTime);
    registration.serveTo = formatToLocalDateTime(this.toDate, this.toTime);

    this.selectedProductDetails = [ this.selectedTime, this.selectedWeight ];

    this.petRegistration.reserve(registration, this.selectedProductDetails).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(["customer/me/my-services"]);
      }
    })
  }

}
