import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-filtering-by-price',
  standalone: true,
  imports: [NgxSliderModule, CurrencyPipe],
  templateUrl: './product-filtering-by-price.component.html',
  styleUrl: './product-filtering-by-price.component.scss'
})
export class ProductFilteringByPriceComponent {

  minValue: number = 0;
  maxValue: number = 30000000;
  options: Options = {
    floor: 0,
    ceil: 30000000,
    step: 200000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b>Tối thiểu: </b>${this.formatVNDCurrency(value)} \u20ab`;
        case LabelType.High:
          return `<b>Tối đa: </b>${this.formatVNDCurrency(value)} \u20ab`;
        default:
          return ``;
      }
    }
  };

  private formatVNDCurrency(value: number): string {
    if (value < 1_000_000) {
      return `${value}`;
    }
    return `${parseFloat(value.toString()) / 1_000_000} triệu`;
  }

}
