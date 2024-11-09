import { CurrencyPipe, NgClass, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductOverview } from '../product-overview.model';
import { ProductRatingDisplayComponent } from '../product-rating-display/product-rating-display.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass, ProductRatingDisplayComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {

  product = input<ProductOverview>();

  cartService = inject(CartService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
  }

  navigateToDetail() {
    this.router.navigate(['products', this.product()?.id]);
  }

  public addToCart() {
    // let productDetail = this.product()?.productDetails[0];
    // let cartDetail = new CartDetail({
    //   quantity: 1,
    //   productDetail: productDetail,
    // });
    // this.cartService.addToCart(getLoggedInUserId(), cartDetail).subscribe({
    //   complete: () => {
    //     console.log('Add to cart successfully');
    //   },
    // });
  }

}
