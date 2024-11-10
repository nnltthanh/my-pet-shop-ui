import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AvatarFrameComponent } from '../user/user-page/avatar-frame/avatar-frame.component';

@Component({
  selector: 'app-management-display',
  standalone: true,
  imports: [AvatarFrameComponent, RouterOutlet],
  templateUrl: './management-display.component.html',
  styleUrl: './management-display.component.scss'
})
export class ManagementDisplayComponent {

  sidebarItems = [
    {
      path: 'products',
      label: 'Quản lý sản phẩm',
      name: 'productManagement',
      isActive: false,
    },
    {
      path: 'accounts',
      label: 'Quản lý tài khoản',
      name: 'accountManagement',
      isActive: false,
    },
    {
      path: 'services',
      label: 'Quản lý dịch vụ',
      name: 'serviceManagement',
      isActive: false,
    },
    {
      path: 'orders',
      label: 'Quản lý đơn hàng',
      name: 'orderManagement',
      isActive: false,
    },
    {
      path: 'reports',
      label: 'Thống kê báo cáo',
      name: 'reportManagement',
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
    return "management";
  }

}
