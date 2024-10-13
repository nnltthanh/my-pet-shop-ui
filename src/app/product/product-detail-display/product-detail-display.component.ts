import { CurrencyPipe, NgFor, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { Gender } from '../../gender.model';
import { ProductDetailService } from '../../services/product-detail.service';
import { ProductService } from '../../services/product.service';
import { PetBreed } from '../pet-category.model';
import { Product } from '../product.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../../services/cart.service';
import { ProductDetail } from '../product-detail.model';
import { CartDetail } from '../../cart/cart-detail.model';

@Component({
  selector: 'app-product-detail-display',
  standalone: true,
  imports: [NgStyle, FormsModule, RadioButtonModule, NgFor, RatingModule, UpperCasePipe, CurrencyPipe, InputNumberModule],
  templateUrl: './product-detail-display.component.html',
  styleUrl: './product-detail-display.component.scss'
})
export class ProductDetailDisplayComponent implements OnInit {

  readonly petBread = PetBreed;

  readonly gender = Gender;

  rating = 4.5;

  selectedQuantity: number = 1;

  selectedCategory: any = null;

  product?: Product;

  constructor(private productDetailService: ProductDetailService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.findById(this.route.snapshot.params['id']).subscribe(product => this.product = product);
  }


  public calculateRate1(): string {
    return this.formatNumber() >= 1 ? 'fa-star checked' : 'fa-star-o';
  }

  public calculateRate2(): string {
    return this.formatNumber() >= 2
      ? 'fa-star checked'
      : this.formatNumber() > 1 &&
        this.formatNumber() <= 3
        ? 'fa-star-half-o checked'
        : 'fa-star-o';
  }

  public calculateRate3(): string {
    return this.formatNumber() >= 3
      ? 'fa-star checked'
      : this.formatNumber() > 2 &&
        this.formatNumber() < 4
        ? 'fa-star-half-o checked'
        : 'fa-star-o';
  }

  public calculateRate4(): string {
    return this.formatNumber() >= 4
      ? 'fa-star checked'
      : this.formatNumber() > 3 &&
        this.formatNumber() < 5
        ? 'fa-star-half-o checked'
        : 'fa-star-o';
  }

  public calculateRate5(): string {
    return this.formatNumber() > 4 &&
      this.formatNumber() < 5
      ? 'fa-star-half-o checked'
      : this.formatNumber() == 5
        ? 'fa-star checked'
        : 'fa-star-o';
  }

  private formatNumber(): number {
    return Math.round(this.rating * 10) / 10;
  }

  public isPet(): boolean {
    return !!this.product && this.product?.category !== null;
  }

  public increase(): void {
    this.product!.quantity && this.selectedQuantity < this.product!.quantity ? this.selectedQuantity++ : this.selectedQuantity;
  }

  public decrease(): void {
    this.product!.quantity && this.selectedQuantity > 0 ? this.selectedQuantity-- : this.selectedQuantity;
  }

  public addToCart() {
    let productDetail = this.product?.productDetails[0];
    let cartDetail = new CartDetail({
      quantity: this.selectedQuantity,
      productDetail: productDetail
    });
    this.cartService.addToCart(1, cartDetail).subscribe({
      complete: () => {
        console.log("Add to cart successfully");
      }
    });
  }

}
