import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filtering-by-price',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgIf, NgClass],
  templateUrl: './product-filtering-by-price.component.html',
  styleUrl: './product-filtering-by-price.component.scss'
})
export class ProductFilteringByPriceComponent {

  minValue?: number;
  maxValue?: number;

}
