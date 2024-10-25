import { Routes } from '@angular/router';
import { HomeDisplayComponent } from './home/home-display/home-display.component';
// import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "cart" },
  { path: 'home', component: HomeDisplayComponent },
  {
    path: 'products',
    loadComponent: () => import('./product/product-display/product-display.component').then(m => m.ProductDisplayComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product/product-detail-display/product-detail-display.component').then(m => m.ProductDetailDisplayComponent),
  },
  {
    path: 'customer/me',
    // canActivate: [AuthGuard],
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
    ],
  },
  {
    path: "orders/payment-result/:id",
    // canActivate: [AuthGuard],
    loadComponent: () => import('./payment-result-page/payment-result-page.component').then(m => m.PaymentResultPageComponent)
  },
  {
    path: 'cart',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./cart/cart-display/cart-display.component').then(m => m.CartDisplayComponent),
    children: [
      {
        path: "info",
        loadComponent: () => import('./user/user-page/user-info-display/user-info-display.component').then(m => m.UserInfoDisplayComponent)
      }
    ],
  },
  {
    
    path: 'management',
    // canActivate: [AuthGuard],
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
    ],
  },
];