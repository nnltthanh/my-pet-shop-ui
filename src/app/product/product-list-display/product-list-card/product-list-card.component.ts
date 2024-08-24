import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-list-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-list-card.component.html',
  styleUrl: './product-list-card.component.scss',
})
export class ProductListCardComponent {
  product = input<Product>();

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
    if (this.product()?.id === 1) {
      return 5;
    }
    if (this.product()?.id === 2) {
      return 3;
    }
    if (this.product()?.id === 3) {
      return 2.5;
    }
    return Math.round(this.product()!.rate * 10) / 10;
  }
}
