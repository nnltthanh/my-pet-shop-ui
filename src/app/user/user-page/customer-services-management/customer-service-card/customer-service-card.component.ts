import { Component, input } from '@angular/core';
import { PetCustomerServiceProduct } from '../../../../product/pet-customer-service-product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-service-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-service-card.component.html',
  styleUrl: './customer-service-card.component.scss'
})
export class CustomerServiceCardComponent {

  service = input<PetCustomerServiceProduct>();

}
