import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home-banner-display',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './home-banner-display.component.html',
  styleUrl: './home-banner-display.component.scss'
})
export class HomeBannerDisplayComponent {

  slides = [
    { img: 'assets/banner-1.jpg' },
    { img: 'assets/banner-2.jpg' },
    { img: 'assets/banner-3.jpg' },
  ];
  slideConfig = {
    slidesToShow: 1,
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

}
