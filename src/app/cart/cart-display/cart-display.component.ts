import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartCardComponent } from './cart-card/cart-card.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { CartService } from '../../services/cart.service';
import { Cart } from '../cart.model';
import { CartDetail } from '../cart-detail.model';
import { getLoggedInUserId, UserService } from '../../services/user.service';
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
    if (this.userService.getLoggedInUser()) {
      this.loggedInUser = this.userService.getLoggedInUser();
    }
    
    this.cartService.getCart(getLoggedInUserId()).subscribe(data => {
      this.cartDetails = data;
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

  onCartDetailDeleted(event: number) {
    
    let index2 = this.cartDetails.findIndex(item => item.id === event);
    if (index2 !== -1) {
      this.cartDetails.splice(index2, 1);
      this.cartDetails = [... this.cartDetails];
    }

    let index = this.selectedCartDetails.findIndex(item => item.id === event);
    if (index !== -1) {
      this.selectedCartDetails.splice(index, 1);
      this.selectedCartDetails = [... this.selectedCartDetails];
    }


  }

}
