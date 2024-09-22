import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductOverview } from '../product-overview.model';
import { ImageData } from '../product-list-display/image-data.model';

@Component({
  selector: 'app-product-carousel-list',
  standalone: true,
  imports: [ProductCardComponent, SlickCarouselModule],
  templateUrl: './product-carousel-list.component.html',
  styleUrl: './product-carousel-list.component.scss',
})
export class ProductCarouselListComponent {

  product = new ProductOverview(
      1,
      'Phụ kiện cho hamster',
      'Phu kien cho hamster',
      100000000,
      '',
      new ImageData(1, '', ''),
      new Date(),
      4.5
    );
  slides = [
    { img: 'http://placehold.it/350x150/000000' },
    { img: 'http://placehold.it/350x150/111111' },
    { img: 'http://placehold.it/350x150/333333' },
    { img: 'http://placehold.it/350x150/666666' },
    { img: 'http://placehold.it/350x150/000000' },
    { img: 'http://placehold.it/350x150/111111' },
    { img: 'http://placehold.it/350x150/333333' },
    { img: 'http://placehold.it/350x150/666666' },
  ];
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 3,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: true,
    focusOnSelect: true,
    centerMode: true,
    arrows: true
  };

  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log(e);

    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log(e);
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log(e);
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log(e);
    console.log('beforeChange');
  }
}
