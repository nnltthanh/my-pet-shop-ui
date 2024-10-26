import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-service-product-management',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './service-product-management.component.html',
  styleUrl: './service-product-management.component.scss'
})
export class ServiceProductManagementComponent {

  serviceMenuItems = [
    {
      path: 'list',
      label: 'Danh sách dịch vụ',
      name: "serviceList",
      isActive: false,
    },
    {
      path: 'calendar',
      label: 'Quản lý lịch hẹn',
      name: "serviceCalendar",
      isActive: false,
    },
  ]

  router = inject(Router);

  toggleActive(name: string) {
    let path: string;
    this.serviceMenuItems.forEach((sidebarItem) => {
      if (sidebarItem.name === name) {
        sidebarItem.isActive = true;
        path = sidebarItem.path;
        this.router.navigate(['management/services', path]);
      } else {
        sidebarItem.isActive = false;
      }
    });
  }

}
