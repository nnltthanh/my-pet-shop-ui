import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Product } from '../product.model';
import { ProductListCardComponent } from './product-list-card/product-list-card.component';

@Component({
  selector: 'app-product-list-display',
  standalone: true,
  imports: [ProductListCardComponent, NgSelectModule, FormsModule],
  templateUrl: './product-list-display.component.html',
  styleUrl: './product-list-display.component.scss',
})
export class ProductListDisplayComponent implements OnInit {
  products?: Product[] = [];
  sortingOptions = [
    { id: 1, option: 'Tải lên gần nhất' },
    { id: 2, option: 'Đánh giá từ cao tới thấp' },
    { id: 3, option: 'Giá từ thấp tới cao' },
    { id: 4, option: 'Giá từ cao tới thấp' },
  ];
  selectedSortingOption = 1;

  ngOnInit(): void {
    let product: Product = {
      id: 1,
      name: '',
      engName: '',
      price: 0,
      description: '',
      imageData: '',
      updatedAt: new Date(),
      rate: 0,
    };
    for (let index = 0; index < 30; index++) {
      this.products?.push(product);
    }
  }
}
