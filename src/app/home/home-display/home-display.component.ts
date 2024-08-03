import { Component } from '@angular/core';
import { HomeBannerDisplayComponent } from '../home-banner-display/home-banner-display.component';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { ProductCarouselListComponent } from '../../product/product-carousel-list/product-carousel-list.component';

@Component({
  selector: 'app-home-display',
  standalone: true,
  imports: [HomeBannerDisplayComponent, ProductCardComponent, ProductCarouselListComponent],
  templateUrl: './home-display.component.html',
  styleUrl: './home-display.component.scss'
})
export class HomeDisplayComponent {

}
