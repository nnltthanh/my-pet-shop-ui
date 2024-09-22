import { Component, input, OnInit } from '@angular/core';
import { ProductOverview } from '../product-overview.model';
import { CurrencyPipe, NgClass } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { ImageData } from '../product-list-display/image-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {

  product = input<ProductOverview>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
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
    if (this.product()) {
      return Math.round(this.product()!.rate * 10) / 10;
    }
    return 0;
  }

  navigateToDetail() {
    this.router.navigate(['products', this.product()?.id]);
  }
}
