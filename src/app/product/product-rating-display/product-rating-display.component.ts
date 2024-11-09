import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-rating-display',
  standalone: true,
  imports: [],
  templateUrl: './product-rating-display.component.html',
  styleUrl: './product-rating-display.component.scss'
})
export class ProductRatingDisplayComponent {

  rating = input.required<number>();

  countRating = input<number>(0);

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
    if (this.rating()) {
      return Math.round(this.rating() * 10) / 10;
    }
    return 0;
  }

}
