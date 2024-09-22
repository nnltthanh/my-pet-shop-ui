import { Routes } from '@angular/router';
import { HomeDisplayComponent } from './home/home-display/home-display.component';
import { ProductDetailDisplayComponent } from './product/product-detail-display/product-detail-display.component';

export const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "home" },
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
    loadComponent: () => import('./user/user-page/customer-page/customer-page.component').then(m => m.CustomerPageComponent),
    children: [
      {
        path: "info",
        loadComponent: () => import('./user/user-page/user-info-display/user-info-display.component').then(m => m.UserInfoDisplayComponent)
      }
    ],
  },
  {
    path: 'management/products',
    loadComponent: () => import('./product/product-management/product-management.component').then(m => m.ProductManagementComponent),
  },
];