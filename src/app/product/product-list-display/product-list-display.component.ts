import { CommonModule, NgFor } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { BehaviorSubject, take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { PagingConfig } from '../../sharing/paging-config.model';
import { ProductOverview } from '../product-overview.model';
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
export class ProductListDisplayComponent implements OnInit, OnChanges {
  readonly MIN_PRICE_VALUE: number = 0;

  readonly MAX_PRICE_VALUE: number = 1_000_000_000_000;

  priceRange = input<{ minValue: number; maxValue: number }>({
    minValue: this.MIN_PRICE_VALUE,
    maxValue: this.MAX_PRICE_VALUE,
  });

  categories = input<{
    accessory: boolean,
    food: boolean,
    dog: boolean,
    cat: boolean,
    hamster: boolean
  }>();

  products: ProductOverview[] = [];

  pagingConfig!: PagingConfig;

  tableSize: number[] = [20, 50, 100];

  sortingOptions = [
    { id: 1, option: 'Tải lên gần nhất' },
    { id: 2, option: 'Từ A-Z' },
    { id: 3, option: 'Từ Z-A' },
    { id: 4, option: 'Đánh giá từ cao tới thấp' },
    { id: 5, option: 'Giá từ thấp tới cao' },
    { id: 6, option: 'Giá từ cao tới thấp' },
  ];

  selectedSortingOption = 1;

  totalItemsInCurrentPage = new BehaviorSubject<number>(0);

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['priceRange'] && !changes['priceRange'].isFirstChange()) {
      console.log("price range change");
      console.log(this.priceRange());

      this.onSortingOrPagingChange();
    }

    if (changes['categories'] && !changes['categories'].isFirstChange()) {
      console.log("categories change");
      console.log(this.categories());

      this.onSortingOrPagingChange();
    }
  }

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

    params = new HttpParams();
    if (this.selectedSortingOption) {
      switch (this.selectedSortingOption) {
        case 1:
          params = params.append('updatedAt', 'DESC');
          break;
        case 2:
          params = params.append("alphabet", "ASC");
          break;
        case 3:
          params = params.append("alphabet", "DESC");
          break;
        case 4:
          // params = params.append("rating", "DESC");
          break;
        case 5:
          params = params.append('price', 'ASC');
          break;
        case 6:
          params = params.append('price', 'DESC');
          break;
        default:
          params = params.append('updatedAt', 'DESC');
      }
    }

    if (this.priceRange()) {
      params = params.append('priceFrom', this.priceRange().minValue);
      params = params.append('priceTo', this.priceRange().maxValue);
    }
    
    if (this.categories() && !this.isFindAllCategories()) {
      params = params.append('breeds', this.buildCategoriesSearch());
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

  private isFindAllCategories(): boolean {
    if (!this.categories()) {
      return true;
    }
    // all false -> find all
    if (!this.categories()?.accessory && !this.categories()?.food && !this.categories()?.dog && !this.categories()?.cat && !this.categories()?.hamster) {
      return true;
    }
    // all true -> find all
    if (this.categories()?.accessory && this.categories()?.food && this.categories()?.dog && this.categories()?.cat && this.categories()?.hamster) {
      return true;
    }
    return false;
  }

  private buildCategoriesSearch(): string {
    let categories = [];
    if (this.categories()?.accessory) {
      // TODO
    }
    if (this.categories()?.food) {
      // TODO
    }
    if (this.categories()?.dog) {
      categories.push("DOG");
    }
    if (this.categories()?.cat) {
      categories.push("CAT");
    }
    if (this.categories()?.hamster) {
      categories.push("HAMSTER");
    }
    return categories.join(",");
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
        : this.isLastPage() && this.pagingConfig.totalItems % this.pagingConfig.itemsPerPage !== 0
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
