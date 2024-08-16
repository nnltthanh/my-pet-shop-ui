import { Component } from '@angular/core';
import { ProductFilteringByCategoriesComponent } from './product-filtering-by-categories/product-filtering-by-categories.component';
import { ProductFilteringByPriceComponent } from './product-filtering-by-price/product-filtering-by-price.component';

@Component({
  selector: 'app-product-filtering',
  standalone: true,
  imports: [ProductFilteringByCategoriesComponent, ProductFilteringByPriceComponent],
  templateUrl: './product-filtering.component.html',
  styleUrl: './product-filtering.component.scss'
})
export class ProductFilteringComponent {

}
