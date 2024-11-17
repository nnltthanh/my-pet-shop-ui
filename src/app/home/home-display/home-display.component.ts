import { Component } from '@angular/core';
import { ProductCarouselListComponent } from '../../product/product-carousel-list/product-carousel-list.component';
import { HomeBannerDisplayComponent } from '../home-banner-display/home-banner-display.component';
import { HomeCategoryListComponent } from '../home-category-list/home-category-list.component';
import { overviewFromDetail, Product } from '../../product/product.model';
import { ProductOverview } from '../../product/product-overview.model';
import { ProductDetailService } from '../../services/product-detail.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../product/product-card/product-card.component';

@Component({
  selector: 'app-home-display',
  standalone: true,
  imports: [HomeBannerDisplayComponent, ProductCarouselListComponent, HomeCategoryListComponent, ProductCardComponent],
  templateUrl: './home-display.component.html',
  styleUrl: './home-display.component.scss'
})
export class HomeDisplayComponent {

  rating = 4.5;

  selectedQuantity: number = 1;

  selectedCategory: any = null;

  product: Product;

  productOverview: ProductOverview;

  constructor(
    private productDetailService: ProductDetailService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productService
      .findById(10)
      .subscribe((product) => {
        this.product = product;
        this.productOverview = overviewFromDetail(this.product);
      });
  }

}
