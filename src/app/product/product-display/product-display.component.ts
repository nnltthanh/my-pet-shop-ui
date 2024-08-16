import { Component } from '@angular/core';
import { ProductFilteringComponent } from '../product-filtering/product-filtering.component';
import { ProductListDisplayComponent } from '../product-list-display/product-list-display.component';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [ProductFilteringComponent, ProductListDisplayComponent],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {

}
