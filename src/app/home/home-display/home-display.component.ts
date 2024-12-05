import { Component } from '@angular/core';
import { ProductCarouselListComponent } from '../../product/product-carousel-list/product-carousel-list.component';
import { HomeBannerDisplayComponent } from '../home-banner-display/home-banner-display.component';
import { HomeCategoryListComponent } from '../home-category-list/home-category-list.component';
import { overviewFromDetail, Product } from '../../product/product.model';
import { ProductOverview } from '../../product/product-overview.model';
import { ProductDetailService } from '../../services/product-detail.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { ProductOverviewResponse } from '../../product/product-overview-response.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PetProductService } from '../../services/pet-product.service';
import { HttpParams } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-display',
  standalone: true,
  imports: [HomeBannerDisplayComponent, ProductCarouselListComponent, HomeCategoryListComponent, ProductCardComponent, AsyncPipe, RouterModule],
  templateUrl: './home-display.component.html',
  styleUrl: './home-display.component.scss'
})
export class HomeDisplayComponent {

  rating = 4.5;

  selectedQuantity: number = 1;

  selectedCategory: any = null;

  product: Product;

  productOverview: ProductOverview;

  latestPetProducts$: Observable<ProductOverviewResponse>;

  constructor(
    private productDetailService: ProductDetailService,
    private productService: ProductService,
    private petProductService: PetProductService
  ) {}

  ngOnInit(): void {
    this.get5LatestPetProduct();
  }

  private get5LatestPetProduct() {
    let params = new HttpParams();
    params = params.append('pageSize', 5);
    params = params.append('page', 0);
    params = params.append('desc', 'createdAt');
    this.latestPetProducts$ = this.petProductService.findAllBy(params);
  }

}
