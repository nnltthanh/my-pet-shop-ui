import { CurrencyPipe } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartDetail } from '../../cart-detail.model';
import { CartService } from '../../../services/cart.service';
import { getLoggedInUserId } from '../../../services/user.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss'
})
export class CartCardComponent implements OnChanges {

  cartDetail = input.required<CartDetail>();

  onCartDetailSelected = output<boolean>();

  onCartDetailChanged = output<CartDetail>();

  onDeleted = output<number>();

  selected: boolean = false;

  options = [
    { key: "1", value: "One" },
    { key: "2", value: "Two" },
    { key: "3", value: "Three" },
    { key: "4", value: "Four" }
  ]

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
    this.cartService.delete(getLoggedInUserId(), this.cartDetail().id).subscribe({
      complete: () => {
        this.onDeleted.emit(this.cartDetail().id);
      }
    })
  }


  public isPet(): boolean {
    return !!this.cartDetail().productDetail.product && this.cartDetail().productDetail.product?.category !== null;
  }

  public getImage(): string {
    return this.cartDetail().productDetail.imageData?.imageUrls || this.cartDetail().productDetail.product.imageData?.imageUrls;
  }

  public onSelectedChange(isSelected: boolean): void {
    this.selected = isSelected;
    this.onCartDetailSelected.emit(this.selected);
  }

}
