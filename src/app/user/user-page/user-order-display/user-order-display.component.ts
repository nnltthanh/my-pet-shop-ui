import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../../../product/order.model';
import { AsyncPipe } from '@angular/common';
import { UserOrderCardComponent } from './user-order-card/user-order-card.component';
import { getLoggedInUserId } from '../../../services/user.service';

@Component({
  selector: 'app-user-order-display',
  standalone: true,
  imports: [AsyncPipe, UserOrderCardComponent],
  templateUrl: './user-order-display.component.html',
  styleUrl: './user-order-display.component.scss'
})
export class UserOrderDisplayComponent implements OnInit {

  orderService = inject(OrderService);

  $orders: Observable<Order[]>;

  ngOnInit(): void {
    this.$orders = this.orderService.findAll(getLoggedInUserId());
  }

}
