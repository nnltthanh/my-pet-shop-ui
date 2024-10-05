import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartCardComponent } from './cart-card/cart-card.component';
import { OrderInfoComponent } from './order-info/order-info.component';

@Component({
  selector: 'app-cart-display',
  standalone: true,
  imports: [OrderInfoComponent, CartCardComponent, FormsModule],
  templateUrl: './cart-display.component.html',
  styleUrl: './cart-display.component.scss'
})
export class CartDisplayComponent {
 
}
