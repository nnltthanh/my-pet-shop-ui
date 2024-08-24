import { Component, output } from '@angular/core';
import { ProductFilteringComponent } from '../product-filtering/product-filtering.component';
import { ProductListDisplayComponent } from '../product-list-display/product-list-display.component';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [ProductFilteringComponent, ProductListDisplayComponent],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss',
})
export class ProductDisplayComponent {
  
  readonly MIN_PRICE_VALUE: number = 0;

  readonly MAX_PRICE_VALUE: number = 1_000_000_000_000;

  priceRange: { minValue: number; maxValue: number } = {
    minValue: this.MIN_PRICE_VALUE,
    maxValue: this.MAX_PRICE_VALUE,
  };

  onPriceRangeChanged($event: any): void {
    this.priceRange = {
      minValue: $event.minValue,
      maxValue: $event.maxValue,
    };
  }
}
