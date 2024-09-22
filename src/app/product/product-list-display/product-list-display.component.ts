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
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductCardComponent } from "../product-card/product-card.component";

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

@Component({
  selector: 'app-product-list-display',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgFor,
    PaginatorModule,
    ProductCardComponent
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

  isLoading: boolean = true;

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
      first: 0,
      rows: 20,
      page: 0,
      pageCount: 0,
      totalRecords: 0,
    };

    let params = new HttpParams();
    params = params.append('desc', 'updatedAt');
    params = params.append('page', this.pagingConfig.page);
    params = params.append('pageSize', this.pagingConfig.rows);

    this.productService
      .findAllBy(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.products = response.data;
        this.pagingConfig.totalRecords = response.total;
        this.calculateTotalItemsInCurrentPage();
        this.isLoading = false;
      });
  }

  public onSelectedSortingOptionChange(sortingOption: {
    id: number;
    option: string;
  }) {
    this.selectedSortingOption = sortingOption.id;
    this.onSortingOrPagingChange();
  }

  public onTableDataChange(event: PaginatorState) {
    this.pagingConfig.first = event.first ?? 0;
    this.pagingConfig.page = event.page ?? 0;
    this.pagingConfig.pageCount = event.pageCount ?? 0;
    if (event.rows !== this.pagingConfig.rows) {
      this.onTableSizeChange(event.rows ?? 20);
    }
    this.onSortingOrPagingChange();
  }

  onTableSizeChange(size: number): void {
    this.pagingConfig.page = 0;
    this.pagingConfig.rows = size;
    this.onSortingOrPagingChange();
  }

  private onSortingOrPagingChange() {
    let params: HttpParams | null = null;

    params = new HttpParams();
    if (this.selectedSortingOption) {
      switch (this.selectedSortingOption) {
        case 1:
          params = params.append('desc', 'updatedAt');
          break;
        case 2:
          params = params.append("asc", "engName");
          break;
        case 3:
          params = params.append("desc", "engName");
          break;
        case 4:
          // params = params.append("rating", "DESC");
          break;
        case 5:
          params = params.append('asc', 'price');
          break;
        case 6:
          params = params.append('desc', 'price');
          break;
        default:
          params = params.append('desc', 'updatedAt');
      }
    }

    if (this.priceRange()) {
      params = params.append('priceFrom', this.priceRange().minValue);
      params = params.append('priceTo', this.priceRange().maxValue);
    }

    if (this.categories() && !this.isFindAllCategories()) {
      params = params.append('breeds', this.buildPetCategoriesSearch());
    }

    if (this.categories() && !this.isFindAllCategories()) {
      params = params.append('accessoryCategories', this.buildAccessoryCategoriesSearch());
    }

    if (this.pagingConfig) {
      params = params.append('page', this.pagingConfig.page);
      params = params.append('pageSize', this.pagingConfig.rows);
    }

    this.isLoading = true;
    this.productService
      .findAllBy(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.products = response.data;
        this.pagingConfig.totalRecords = response.total;
        this.calculateTotalItemsInCurrentPage();
        this.scrollToTop();
        this.isLoading = false;
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

  private buildPetCategoriesSearch(): string {
    let categories = [];
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

  // GENERAL_ACCESSORY(0), // TODO
  //   FOOD_ACCESSORY(1),
  //   PET_FOOD(2),
  //   PET_SANITARY(3),
  //   PET_MEDICINE(4),
  //   PET_HOUSE(5),
  //   PET_CLOTHING(6),
  //   OTHER(7);

  private buildAccessoryCategoriesSearch(): string { // TODO
    let categories = [];
    if (this.categories()?.accessory) {
      categories.push("PET_HOUSE");
    }
    if (this.categories()?.food) {
      categories.push("PET_FOOD");
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
      this.pagingConfig.totalRecords <= this.pagingConfig.rows
        ? this.pagingConfig.totalRecords
        : this.isLastPage() && this.pagingConfig.totalRecords % this.pagingConfig.rows !== 0
          ? this.pagingConfig.totalRecords % this.pagingConfig.rows
          : this.pagingConfig.rows
    );
  }

  private isLastPage(): boolean {
    return this.pagingConfig.pageCount === this.pagingConfig.page + 1;
  }
}
