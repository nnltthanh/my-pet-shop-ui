import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from '../../../services/product.service';
import { Product } from '../product.model';
import { ImageData } from './image-data.model';
import { ProductListCardComponent } from './product-list-card/product-list-card.component';
import { take } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    let product: Product = {
      id: 1,
      name: '',
      engName: '',
      price: 0,
      description: '',
      imageData: new ImageData(1, '', ''),
      updatedAt: new Date(),
      rate: 0,
    };
    // for (let index = 0; index < 30; index++) {
    //   this.products?.push(product);
    // }
    let params = new HttpParams();
    params = params.append("updatedAt", "DESC");
    
    this.productService.findAllBy(params).pipe(
      take(1)
    ).subscribe((products) => {
      this.products = products;
    })
  }

  public onSelectedSortingOptionChange(sortingOption: { id: number, option: string }) {
    let params: HttpParams | null = null;

    if (sortingOption.id === 1) {
      params = new HttpParams();
      params = params.append("updatedAt", "DESC");
    }
    if (sortingOption.id === 2) {
      // params.append("updatedAt", "DESC");
    }
    if (sortingOption.id === 3) {
      params = new HttpParams();
      params = params.append("price", "ASC");
    }
    if (sortingOption.id === 4) {
      params = new HttpParams();
      params = params.append("price", "DESC");
    }
    this.productService.findAllBy(params).pipe(take(1)).subscribe((products) => {
      this.products = products;
    })
  }
}

