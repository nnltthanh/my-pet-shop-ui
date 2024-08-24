import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filtering-by-price',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgIf, NgClass],
  templateUrl: './product-filtering-by-price.component.html',
  styleUrl: './product-filtering-by-price.component.scss',
})
export class ProductFilteringByPriceComponent {
  readonly MIN_PRICE_VALUE: number = 0;

  readonly MAX_PRICE_VALUE: number = 1_000_000_000_000;

  minValue?: number;

  maxValue?: number;

  priceChange = output<{ minValue: number; maxValue: number }>();

  onPriceRangeChanged(): void {
    this.priceChange.emit({
      minValue: this.minValue ? this.minValue : this.MIN_PRICE_VALUE,
      maxValue: this.maxValue ? this.maxValue : this.MAX_PRICE_VALUE,
    });
  }
}
