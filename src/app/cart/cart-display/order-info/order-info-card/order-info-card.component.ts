import { CurrencyPipe } from '@angular/common';
import { Component, input, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartDetail } from '../../../cart-detail.model';
import { CartService } from '../../../../services/cart.service';
import { getLoggedInUserId } from '../../../../services/user.service';

@Component({
  selector: 'app-order-info-card',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './order-info-card.component.html',
  styleUrl: './order-info-card.component.scss',
})
export class OrderInfoCardComponent {

  cartDetail = input.required<CartDetail>();

  onCartDetailSelected = output<boolean>();

  onCartDetailChanged = output<CartDetail>();

  options = [
    { key: '1', value: 'One' },
    { key: '2', value: 'Two' },
    { key: '3', value: 'Three' },
    { key: '4', value: 'Four' },
  ];

  constructor(private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartDetail']) {
      this.calculateTotal();
    }
  }

  public calculateTotal() {
    let total = this.cartDetail().productDetail.price * this.cartDetail().quantity;
    this.cartDetail().total = total;
    this.cartService.update(getLoggedInUserId(), this.cartDetail()).subscribe({
      complete: () => {
        this.onCartDetailChanged.emit(this.cartDetail());
      }
    });
  }

  public increase(): void {
    if (this.cartDetail().quantity >= this.cartDetail().productDetail.quantity) {
      console.error("can not add more");
    } else {
      ++this.cartDetail().quantity;
      this.calculateTotal();
    }
  }

  public decrease(): void {
    this.cartDetail().quantity > 1 ? --this.cartDetail().quantity : this.deleteCartDetail();
    this.calculateTotal();
  }

  public deleteCartDetail() {
    this.cartDetail().quantity = 0;
  }


  public isPet(): boolean {
    return !!this.cartDetail().productDetail.product && this.cartDetail().productDetail.product?.category !== null;
  }

  public getImage(): string {
    return this.cartDetail().productDetail.imageData?.imageUrls || this.cartDetail().productDetail.product.imageData?.imageUrls;
  }

}
