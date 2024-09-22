import { Component } from '@angular/core';
import { ProductCarouselListComponent } from '../../product/product-carousel-list/product-carousel-list.component';
import { HomeBannerDisplayComponent } from '../home-banner-display/home-banner-display.component';
import { HomeCategoryListComponent } from '../home-category-list/home-category-list.component';

@Component({
  selector: 'app-home-display',
  standalone: true,
  imports: [HomeBannerDisplayComponent, ProductCarouselListComponent, HomeCategoryListComponent],
  templateUrl: './home-display.component.html',
  styleUrl: './home-display.component.scss'
})
export class HomeDisplayComponent {

}
