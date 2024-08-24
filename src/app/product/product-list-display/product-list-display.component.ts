import { CommonModule, NgFor } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { BehaviorSubject, take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { PagingConfig } from '../../sharing/paging-config.model';
import { Product } from '../product.model';
import { ProductListCardComponent } from './product-list-card/product-list-card.component';

@Component({
  selector: 'app-product-list-display',
  standalone: true,
  imports: [
    ProductListCardComponent,
    NgSelectModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgFor,
  ],
  templateUrl: './product-list-display.component.html',
  styleUrl: './product-list-display.component.scss',
})
export class ProductListDisplayComponent implements OnInit {
  products: Product[] = [];

  pagingConfig!: PagingConfig;

  tableSize: number[] = [20, 50, 100];

  sortingOptions = [
    { id: 1, option: 'Tải lên gần nhất' },
    { id: 2, option: 'Đánh giá từ cao tới thấp' },
    { id: 3, option: 'Giá từ thấp tới cao' },
    { id: 4, option: 'Giá từ cao tới thấp' },
  ];

  selectedSortingOption = 1;

  totalItemsInCurrentPage = new BehaviorSubject<number>(0);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.pagingConfig = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: 0,
    };

    let params = new HttpParams();
    params = params.append('updatedAt', 'DESC');
    params = params.append('page', this.pagingConfig.currentPage - 1);
    params = params.append('pageSize', this.pagingConfig.itemsPerPage);

    this.productService
      .findAllBy(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.products = response.data;
        this.pagingConfig.totalItems = response.total;
        this.calculateTotalItemsInCurrentPage();
      });
  }

  public onSelectedSortingOptionChange(sortingOption: {
    id: number;
    option: string;
  }) {
    this.selectedSortingOption = sortingOption.id;
    this.onSortingOrPagingChange();
  }

  public onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.onSortingOrPagingChange();
  }

  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.onSortingOrPagingChange();
  }

  private onSortingOrPagingChange() {
    let params: HttpParams | null = null;
    console.log(this.selectedSortingOption);

    params = new HttpParams();
    if (this.selectedSortingOption) {
      if (this.selectedSortingOption === 1) {
        params = params.append('updatedAt', 'DESC');
      }
      if (this.selectedSortingOption === 2) {
        // params.append("updatedAt", "DESC");
      }
      if (this.selectedSortingOption === 3) {
        params = params.append('price', 'ASC');
      }
      if (this.selectedSortingOption === 4) {
        params = params.append('price', 'DESC');
      }
    }

    if (this.pagingConfig) {
      params = params.append('page', this.pagingConfig.currentPage - 1);
      params = params.append('pageSize', this.pagingConfig.itemsPerPage);
    }

    this.productService
      .findAllBy(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.products = response.data;
        this.pagingConfig.totalItems = response.total;
        this.calculateTotalItemsInCurrentPage();
        this.scrollToTop();
      });
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  private calculateTotalItemsInCurrentPage(): void {
    this.totalItemsInCurrentPage.next(
      this.pagingConfig.totalItems <= this.pagingConfig.itemsPerPage
        ? this.pagingConfig.totalItems
        : this.isLastPage()
        ? this.pagingConfig.totalItems % this.pagingConfig.itemsPerPage
        : this.pagingConfig.itemsPerPage
    );
  }

  private isLastPage(): boolean {
    return (
      this.pagingConfig.itemsPerPage * this.pagingConfig.currentPage >=
      this.pagingConfig.totalItems
    );
  }
}
