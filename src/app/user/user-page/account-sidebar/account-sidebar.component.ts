import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';

@Component({
  selector: 'app-account-sidebar',
  standalone: true,
  imports: [NgClass, AvatarFrameComponent],
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.scss',
})
export class AccountSidebarComponent {
  sidebarItems = [
    {
      path: 'info',
      label: 'Thông tin tài khoản',
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip6_34.png',
      name: 'userInfo',
      isActive: false,
    },
    {
      path: 'myOrders',
      label: 'Lịch sử đơn hàng',
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip4_7.png',
      name: 'orderHistory',
      isActive: false,
    },
    {
      path: 'myCoupons',
      label: 'Ví voucher',
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip1_59.png',
      name: 'voucherWallet',
      isActive: false,
    },
    {
      path: 'address-book',
      label: 'Sổ địa chỉ',
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip2_76.png',
      name: 'addressBook',
      isActive: false,
    },
    {
      path: 'myReviews',
      label: 'Đánh giá và phản hồi',
      imageSrc: 'https://mcdn.coolmate.me/image/September2023/mceclip3_71.png',
      name: 'reviewsFeedback',
      isActive: false,
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  toggleActive(name: string) {
    let path: string;
    this.sidebarItems.forEach((sidebarItem) => {
      if (sidebarItem.name === name) {
        sidebarItem.isActive = true;
        path = sidebarItem.path;
        this.router.navigate([this.getRoute(), path]);
      } else {
        sidebarItem.isActive = false;
      }
    });
  }
  
  private getRoute() {
    return "customer/me/";
  }
}
