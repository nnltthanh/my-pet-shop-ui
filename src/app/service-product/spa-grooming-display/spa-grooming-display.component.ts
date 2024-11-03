import { Component, inject, OnInit } from '@angular/core';
import { ServiceProductService } from '../../services/service-product.service';
import { ServiceProduct, ServiceProductType } from '../../product/service-product.model';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spa-grooming-display',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './spa-grooming-display.component.html',
  styleUrl: './spa-grooming-display.component.scss'
})
export class SpaGroomingDisplayComponent implements OnInit {

  serviceProductService = inject(ServiceProductService);

  products: ServiceProduct[]  = [];

  $isLoaded: Observable<ServiceProduct[]>;

  isRegistering: boolean = false;

  ngOnInit(): void {
    this.$isLoaded = this.serviceProductService.findAllByType(ServiceProductType.SPA_GROOMING).pipe(
      map((data) => {
        this.products = [... data];
        console.log(this.products);
        
        return data;
      })
    )
  }

}
