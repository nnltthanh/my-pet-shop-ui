import { AsyncPipe, CurrencyPipe, NgFor, NgStyle, UpperCasePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { map, Observable, ReplaySubject } from 'rxjs';
import { CartDetail } from '../../cart/cart-detail.model';
import { Gender } from '../../gender.model';
import { CartService } from '../../services/cart.service';
import { PetProductService } from '../../services/pet-product.service';
import { ProductDetailService } from '../../services/product-detail.service';
import { ProductService } from '../../services/product.service';
import { getLoggedInUserId } from '../../services/user.service';
import { PetBreed, PetCategory } from '../pet-category.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductOverview } from '../product-overview.model';
import { ProductRatingDisplayComponent } from '../product-rating-display/product-rating-display.component';
import { overviewFromDetail, Product } from '../product.model';
import { ProductDetailReviewDisplayComponent } from './product-detail-review-display/product-detail-review-display.component';
import { AuthService } from '../../auth.service';
import { ToastMessageService } from '../../sharing/toast-message/toast-message.service';

@Component({
  selector: 'app-product-detail-display',
  standalone: true,
  imports: [
    FormsModule,
    RadioButtonModule,
    RatingModule,
    UpperCasePipe,
    CurrencyPipe,
    AsyncPipe,
    InputNumberModule,
    ProductDetailReviewDisplayComponent,
    ProductRatingDisplayComponent,
    ProductCardComponent
  ],
  templateUrl: './product-detail-display.component.html',
  styleUrl: './product-detail-display.component.scss',
})
export class ProductDetailDisplayComponent implements OnInit {
  readonly petBread = PetBreed;

  readonly gender = Gender;

  rating = 4.5;

  selectedQuantity: number = 1;

  selectedCategory: any = null;

  product: Product;

  productOverview: ProductOverview;

  suggestedProducts1$: Observable<ProductOverview[]>;

  suggestedProducts2$: Observable<ProductOverview[]>;

  suggestedProducts$ = new ReplaySubject<ProductOverview[]>();

  toastMessageService = inject(ToastMessageService);

  constructor(
    private productDetailService: ProductDetailService,
    private productService: ProductService,
    private petProductService: PetProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.productService
      .findById(this.route.snapshot.params['id'])
      .subscribe((product) => {
        this.product = product;
        this.productOverview = overviewFromDetail(this.product);

        if (this.product?.category) {
          this.get5RelatedPetProduct(this.product.category);
        }
      });
  }

  private get5RelatedPetProduct(category: PetCategory) {
    let sameCategoryNameParams = new HttpParams();
    sameCategoryNameParams = sameCategoryNameParams.append('pageSize', 5);
    sameCategoryNameParams = sameCategoryNameParams.append('page', 0);
    sameCategoryNameParams = sameCategoryNameParams.append('desc', 'createdAt');
    sameCategoryNameParams = sameCategoryNameParams.append('keyword', category.name);

    let sameBreedParams = new HttpParams();
    sameBreedParams = sameBreedParams.append('pageSize', 5);
    sameBreedParams = sameBreedParams.append('page', 0);
    sameBreedParams = sameBreedParams.append('desc', 'createdAt');
    sameBreedParams = sameBreedParams.append('breeds', category.breed);

    this.petProductService.findAllBy(sameCategoryNameParams).pipe(map((product) => product.data))
    .subscribe({
      next: (data) => {
        let suggestedProducts: ProductOverview[] = [];
        suggestedProducts = [...data];
        if (!data || data.length < 5) {
          this.petProductService.findAllBy(sameBreedParams).pipe(map((product) => product.data))
          .subscribe({
            next: data2 => {
              if (!data) {
                suggestedProducts = [...data2];
              } else if (data.length < 5 && data2?.length > 0) {
                for (let index = 0; index < 5 - data.length; index++) {
                  suggestedProducts.push(data2[index]);
                }
              }
              this.suggestedProducts$.next(suggestedProducts);
            }
          })
        }
      }
    });
  }

  public calculateRate1(): string {
    return this.formatNumber() >= 1 ? 'fa-star checked' : 'fa-star-o';
  }

  public calculateRate2(): string {
    return this.formatNumber() >= 2
      ? 'fa-star checked'
      : this.formatNumber() > 1 && this.formatNumber() <= 3
      ? 'fa-star-half-o checked'
      : 'fa-star-o';
  }

  public calculateRate3(): string {
    return this.formatNumber() >= 3
      ? 'fa-star checked'
      : this.formatNumber() > 2 && this.formatNumber() < 4
      ? 'fa-star-half-o checked'
      : 'fa-star-o';
  }

  public calculateRate4(): string {
    return this.formatNumber() >= 4
      ? 'fa-star checked'
      : this.formatNumber() > 3 && this.formatNumber() < 5
      ? 'fa-star-half-o checked'
      : 'fa-star-o';
  }

  public calculateRate5(): string {
    return this.formatNumber() > 4 && this.formatNumber() < 5
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
    this.product!.quantity && this.selectedQuantity < this.product!.quantity
      ? this.selectedQuantity++
      : this.selectedQuantity;
  }

  public decrease(): void {
    this.product!.quantity && this.selectedQuantity > 0
      ? this.selectedQuantity--
      : this.selectedQuantity;
  }

  public addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.authService.onLogin();
      return;
    }

    let productDetail = this.product?.productDetails[0];
    let cartDetail = new CartDetail({
      quantity: this.selectedQuantity,
      productDetail: productDetail,
    });
    this.cartService.addToCart(getLoggedInUserId(), cartDetail).subscribe({
      complete: () => {
        this.toastMessageService.addSuccessfulMessage("Add to cart successfully");
        console.log('Add to cart successfully');
      },
    });
  }
}
