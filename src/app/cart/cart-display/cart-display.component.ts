import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartCardComponent } from './cart-card/cart-card.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { CartService } from '../../services/cart.service';
import { Cart } from '../cart.model';
import { CartDetail } from '../cart-detail.model';
import { UserService } from '../../services/user.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-cart-display',
  standalone: true,
  imports: [OrderInfoComponent, CartCardComponent, FormsModule],
  templateUrl: './cart-display.component.html',
  styleUrl: './cart-display.component.scss'
})
export class CartDisplayComponent implements OnInit {

  cartDetails: CartDetail[];

  loggedInUser: User;

  selectedCartDetails: CartDetail[] = [];
 
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    this.cartService.getCart(1).subscribe(data => {
      this.cartDetails = data;
    })

    this.userService.findById(1).subscribe(user => {
      this.loggedInUser = user;
    })
  }

  public onCartDetailSelected(cartDetail: CartDetail, isSelected: boolean) {
    let index = this.selectedCartDetails.indexOf(cartDetail);
    if(isSelected) {
      if (index === -1) {
        this.selectedCartDetails.push(cartDetail);
        this.selectedCartDetails = [...this.selectedCartDetails];
      }
    } else {
      if (index !== -1) {
        this.selectedCartDetails.splice(index, 1);
        this.selectedCartDetails = [...this.selectedCartDetails];
      }
    }
  }

  public onCartDetailChanged(cartDetail: CartDetail) {
    let index = -1;
    let cartDetailInList = this.selectedCartDetails.find((item, i) => {
      if (item.id == cartDetail.id) {
        index = i;
        return true;
      } 
      return false;
    });
    if (index !== -1) {
      this.selectedCartDetails[index] = cartDetail;
      this.selectedCartDetails = [...this.selectedCartDetails];
    }
  }

}
