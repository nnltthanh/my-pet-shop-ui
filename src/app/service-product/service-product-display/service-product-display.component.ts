import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ServiceProductType } from '../../product/service-product.model';

@Component({
  selector: 'app-service-product-display',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './service-product-display.component.html',
  styleUrl: './service-product-display.component.scss'
})
export class ServiceProductDisplayComponent {

  serviceItems = [
    {
      path: 'spa-grooming',
      label: ServiceProductType.SPA_GROOMING,
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip6_34.png',
      name: 'spa-grooming',
      isActive: false,
    },
    {
      path: 'pet-hotel',
      label: ServiceProductType.PET_HOTEL,
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip4_7.png',
      name: 'pet-hotel',
      isActive: false,
    },
    {
      path: 'others',
      label: ServiceProductType.OTHER,
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip1_59.png',
      name: 'others',
      isActive: false,
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.toggleActive("pet-hotel");
  }

  toggleActive(name: string) {
    let path: string;
    this.serviceItems.forEach((serviceItem) => {
      if (serviceItem.name === name) {
        serviceItem.isActive = true;
        path = serviceItem.path;
        this.router.navigate([this.getRoute(), path]);
      } else {
        serviceItem.isActive = false;
      }
    });
  }
  
  private getRoute() {
    return "services";
  }

}
