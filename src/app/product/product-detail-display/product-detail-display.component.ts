import { CurrencyPipe, NgFor, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { Product } from '../product.model';
import { ProductDetailService } from '../../services/product-detail.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-display',
  standalone: true,
  imports: [NgStyle, FormsModule, RadioButtonModule, NgFor, RatingModule, UpperCasePipe, CurrencyPipe],
  templateUrl: './product-detail-display.component.html',
  styleUrl: './product-detail-display.component.scss'
})
export class ProductDetailDisplayComponent implements OnInit {

  rating = 4.5;

  selectedCategory: any = null;

  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' }
  ];

  product?: Product;

  constructor(private productDetailService: ProductDetailService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.findById(this.route.snapshot.params['id']).subscribe(product => this.product = product);
  }


  public calculateRate1(): string {
    return this.formatNumber() >= 1 ? 'fa-star checked' : 'fa-star-o';
  }

  public calculateRate2(): string {
    return this.formatNumber() >= 2
      ? 'fa-star checked'
      : this.formatNumber() > 1 &&
        this.formatNumber() <= 3
        ? 'fa-star-half-o checked'
        : 'fa-star-o';
  }

  public calculateRate3(): string {
    return this.formatNumber() >= 3
      ? 'fa-star checked'
      : this.formatNumber() > 2 &&
        this.formatNumber() < 4
        ? 'fa-star-half-o checked'
        : 'fa-star-o';
  }

  public calculateRate4(): string {
    return this.formatNumber() >= 4
      ? 'fa-star checked'
      : this.formatNumber() > 3 &&
        this.formatNumber() < 5
        ? 'fa-star-half-o checked'
        : 'fa-star-o';
  }

  public calculateRate5(): string {
    return this.formatNumber() > 4 &&
      this.formatNumber() < 5
      ? 'fa-star-half-o checked'
      : this.formatNumber() == 5
        ? 'fa-star checked'
        : 'fa-star-o';
  }

  private formatNumber(): number {
    return Math.round(this.rating * 10) / 10;
  }

}
