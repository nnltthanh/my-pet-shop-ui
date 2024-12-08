import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AvatarFrameComponent } from '../user/user-page/avatar-frame/avatar-frame.component';
import { AuthService } from '../auth.service';
import { RoleName } from '../role-name.model';

@Component({
  selector: 'app-management-display',
  standalone: true,
  imports: [AvatarFrameComponent, RouterOutlet],
  templateUrl: './management-display.component.html',
  styleUrl: './management-display.component.scss'
})
export class ManagementDisplayComponent implements OnInit {

  sidebarItems = [
    {
      path: 'products',
      label: 'Quản lý sản phẩm',
      name: 'productManagement',
      isActive: false,
      receptionistAccess: true,
      serviceStaffAccess: false
    },
    {
      path: 'accounts',
      label: 'Quản lý tài khoản',
      name: 'accountManagement',
      isActive: false,
      hasPermission: false,
      receptionistAccess: false,
      serviceStaffAccess: false
    },
    {
      path: 'services',
      label: 'Quản lý dịch vụ',
      name: 'serviceManagement',
      isActive: false,
      hasPermission: false,
      receptionistAccess: true,
      serviceStaffAccess: true
    },
    {
      path: 'orders',
      label: 'Quản lý đơn hàng',
      name: 'orderManagement',
      roles: [RoleName.ADMIN],
      isActive: false,
      hasPermission: false,
      receptionistAccess: true,
      serviceStaffAccess: false
    },
    {
      path: 'reports',
      label: 'Thống kê báo cáo',
      name: 'reportManagement',
      roles: [RoleName.ADMIN],
      isActive: false,
      hasPermission: false,
      receptionistAccess: false,
      serviceStaffAccess: false
    },
    // {
    //   path: 'chat',
    //   label: 'Tư vấn khách hàng',
    //   name: 'conversationManagement',
    //   roles: [RoleName.ADMIN, RoleName.RECEPTIONIST],
    //   isActive: false,
    //   hasPermission: false,
    //   receptionistAccess: true,
    //   serviceStaffAccess: false
    // },
  ];

  loggedInUserRoles: string[] = [];

  authService = inject(AuthService);

  isAdmin: boolean;

  isServiceStaff: boolean;

  isReceptionistStaff: boolean;

  isCustomer: boolean;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isUserInRole(RoleName.ADMIN);
    this.isCustomer = this.authService.isUserInRole(RoleName.CUSTOMER);
    this.isReceptionistStaff = this.authService.isUserInRole(RoleName.RECEPTIONIST);
    this.isServiceStaff = this.authService.isUserInRole(RoleName.SERVICE_STAFF);
  }

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

  logout(): void {
    console.log("logout", this.authService.isLoggedIn());
    this.authService.onLogout();
  }

}
