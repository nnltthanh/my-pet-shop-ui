import { Component, output, signal } from '@angular/core';
import { ProductFilteringByCategoriesComponent } from './product-filtering-by-categories/product-filtering-by-categories.component';
import { ProductFilteringByPriceComponent } from './product-filtering-by-price/product-filtering-by-price.component';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-product-filtering',
  standalone: true,
  imports: [
    ProductFilteringByCategoriesComponent,
    ProductFilteringByPriceComponent,
    MatExpansionModule
  ],
  templateUrl: './product-filtering.component.html',
  styleUrl: './product-filtering.component.scss',
})
export class ProductFilteringComponent {

  readonly panelOpenState = signal(false);

  priceChange = output<{ minValue: number; maxValue: number }>();

  categoriesChange = output<{
    accessory: boolean,
    food: boolean,
    dog: boolean,
    cat: boolean,
    hamster: boolean
  }>();

  onPriceRangeChanged($event: any): void {
    this.priceChange.emit({
      minValue: $event.minValue,
      maxValue: $event.maxValue,
    });
  }

  onCategoriesRangeChanged($event: any): void {
    this.categoriesChange.emit({
      accessory: $event.accessory,
      food: $event.food,
      dog: $event.dog,
      cat: $event.cat,
      hamster: $event.hamster
    });

  }
}
