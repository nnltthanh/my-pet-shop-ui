import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../product.model';
import { CurrencyPipe, NgClass } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

@Component({
  selector: 'app-product-list-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-list-card.component.html',
  styleUrl: './product-list-card.component.scss'
})
export class ProductListCardComponent {
  product!: Product;

  ngOnInit(): void {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
    if (!this.product) {
      this.product = new Product(
        1,
        'Phụ kiện cho hamster',
        'Phu kien cho hamster',
        100000000,
        '',
        '',
        new Date(),
        4.5
      );
    }
    this.product.id = 1;
    this.product.name = 'Phụ kiện cho hamster';
    this.product.engName = 'Phu kien cho hamster';
    this.product.price = 100000000;
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
    return Math.round(this.product.rate * 10) / 10;
  }
}
