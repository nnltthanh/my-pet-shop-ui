import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-info-card',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './order-info-card.component.html',
  styleUrl: './order-info-card.component.scss'
})
export class OrderInfoCardComponent {
  quantity: number = 1;
  options = [
    {key: "1", value: "One"},
    {key: "2", value: "Two"},
    {key: "3", value: "Three"},
    {key: "4", value: "Four"}
  ]
    
  public increase(): void {
    // this.product!.quantity && this.selectedQuantity < this.product!.quantity ? this.selectedQuantity++ : this.selectedQuantity;
    this.quantity++;
  }

  public decrease(): void {
    // this.product!.quantity && this.selectedQuantity > 0 ? this.selectedQuantity-- : this.selectedQuantity;
    this.quantity > 1 ? this.quantity-- : this.deleteCartDetail();
  }

  public deleteCartDetail() {
    this.quantity = 0;
  }
}
