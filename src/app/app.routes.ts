import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeDisplayComponent } from './home/home-display/home-display.component';
import { RoleName } from './role-name.model';
// import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "products" },
  { path: 'home', component: HomeDisplayComponent },
  {
    path: 'products',
    loadComponent: () => import('./product/product-display/product-display.component').then(m => m.ProductDisplayComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./service-product/service-product-display/service-product-display.component').then(m => m.ServiceProductDisplayComponent),
    children: [
      {
        path: "spa-grooming",
        loadComponent: () => import('./service-product/spa-grooming-display/spa-grooming-display.component').then(m => m.SpaGroomingDisplayComponent)
      },
      {
        path: "pet-hotel",
        loadComponent: () => import('./service-product/pet-hotel-display/pet-hotel-display.component').then(m => m.PetHotelDisplayComponent)
      },
      {
        path: "others",
        loadComponent: () => import('./service-product/other-serivces-display/other-serivces-display.component').then(m => m.OtherSerivcesDisplayComponent)
      },
    ]
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product/product-detail-display/product-detail-display.component').then(m => m.ProductDetailDisplayComponent),
  },
  {
    path: 'customer/me',
    data: { "roles": [ RoleName.CUSTOMER ] },
    canActivate: [AuthGuard],
    loadComponent: () => import('./user/user-page/customer-page/customer-page.component').then(m => m.CustomerPageComponent),
    children: [
      {
        path: "info",
        loadComponent: () => import('./user/user-page/user-info-display/user-info-display.component').then(m => m.UserInfoDisplayComponent)
      },
      {
        path: "address-book",
        loadComponent: () => import('./user/user-page/address-book-display/address-book-display.component').then(m => m.AddressBookDisplayComponent)
      },
      {
        path: "orders",
        loadComponent: () => import('./user/user-page/user-order-display/user-order-display.component').then(m => m.UserOrderDisplayComponent)
      },
      {
        path: "reviews",
        loadComponent: () => import('./user/user-page/user-review-product-display/user-review-product-display.component').then(m => m.UserReviewProductDisplayComponent)
      },
      {
        path: "my-pet",
        loadComponent: () => import('./user/user-page/customer-pet-management/customer-pet-management.component').then(m => m.CustomerPetManagementComponent)
      },
      {
        path: "my-services",
        loadComponent: () => import('./user/user-page/customer-services-management/customer-services-management.component').then(m => m.CustomerServicesManagementComponent)
      },
    ],
  },
  {
    path: "orders/payment-result/:id",
    data: { "roles": [ RoleName.CUSTOMER ] },
    canActivate: [AuthGuard],
    loadComponent: () => import('./payment-result-page/payment-result-page.component').then(m => m.PaymentResultPageComponent)
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    data: { "roles": [ RoleName.CUSTOMER ] },
    loadComponent: () => import('./cart/cart-display/cart-display.component').then(m => m.CartDisplayComponent),
    children: [
      {
        path: "info",
        loadComponent: () => import('./user/user-page/user-info-display/user-info-display.component').then(m => m.UserInfoDisplayComponent)
      }
    ],
  },
  {
    path: "news",
    loadComponent: () => import('./news-page/news-page.component').then(m => m.NewsPageComponent),
  },
  {
    path: "about-us",
    loadComponent: () => import('./about-us-page/about-us-page.component').then(m => m.AboutUsPageComponent),
  },
  {
    path: 'management',
    data: { "roles": [ RoleName.ADMIN, RoleName.RECEPTIONIST, RoleName.SERVICE_STAFF ] },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./management-display/management-display.component').then(m => m.ManagementDisplayComponent),
    children: [
      {
        path: "products",
        loadComponent: () => import('./product/product-management/product-management.component').then(m => m.ProductManagementComponent)
      },
      {
        path: "accounts",
        loadComponent: () => import('./management-display/account-management/account-management.component').then(m => m.AccountManagementComponent)
      },
      {
        path: "services",
        loadComponent: () => import('./management-display/service-product-management/service-product-management.component').then(m => m.ServiceProductManagementComponent),
        children: [
          {
            path: "list",
            loadComponent: () => import('./management-display/service-product-management/service-product-list-display/service-product-list-display.component').then(m => m.ServiceProductListDisplayComponent)
          },
          {
            path: "calendar",
            loadComponent: () => import('./management-display/service-product-management/service-product-calendar-display/service-product-calendar-display.component').then(m => m.ServiceProductCalendarDisplayComponent)
          },
        ]
      },
      {
        path: "orders",
        loadComponent: () => import('./management-display/product-order-management/product-order-management.component').then(m => m.ProductOrderManagementComponent)
      },
      {
        path: "reports",
        loadComponent: () => import('./management-display/reports/report-display/report-display.component').then(m => m.ReportDisplayComponent)
      },
      {
        path: "chat",
        loadComponent: () => import('./management-display/conversation-management/conversation-management-display/conversation-management-display.component').then(m => m.ConversationManagementDisplayComponent)
      },
    ],
  },
  {
    path: "access-denied",
    loadComponent: () => import('./access-denied/access-denied.component').then(m => m.AccessDeniedComponent),
  }
];